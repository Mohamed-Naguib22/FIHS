using FIHS.Models;
using OpenAI_API.Completions;
using OpenAI_API;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FIHS.Interfaces;
using FIHS.Models.ChatGPT;
using ChatGPT.Net;
using System.Linq;

namespace FIHS.Services
{
    public class ChatGPTService : BaseService, IChatGPTService
    {
        private readonly IConfiguration _configuration;
        public ChatGPTService(IConfiguration configuration, 
            ApplicationDbContext context, 
            UserManager<ApplicationUser> userManager) : base(context, userManager)
        {
            _configuration = configuration;
        }
        private async Task<ApplicationUser?> GetUserByRefreshToken(string refreshToken)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }
        public async Task<Chat> NewChatAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            var chat = new Chat
            {
                Id = Guid.NewGuid().ToString(),
                Timestamp= DateTime.UtcNow,
                ApplicationUserId = user.Id
            };

            await _context.Chats.AddAsync(chat);
            await _context.SaveChangesAsync();
            
            return chat;
        }

        public async Task<AnswerModel> AskQuestionAsync(QuestionModel model, string chatId, string refreshToken)
        {
            var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == chatId);

            if (chat == null)
                return new AnswerModel { Message = "Chat is not found", StatusCode = 404 };

            var user = await GetUserByRefreshToken(refreshToken);

            if (chat.ApplicationUserId != user.Id)
                return new AnswerModel { Message = "Unauthorized access", StatusCode = 401 };

            var apiKey = _configuration["ApiKeys:ChatGPT"];
            var openAi = new ChatGpt(apiKey);
            var answer = await openAi.Ask(model.Question);

            var questionMessage = new Message("Chatbot", model.Question, chatId);
            var answerMessage = new Message(user.UserName, answer, chatId);

            await _context.Messages.AddRangeAsync(questionMessage, answerMessage);

            await _context.SaveChangesAsync();
            return new AnswerModel { Answer = answer }; 
        }

        public async Task<IEnumerable<Chat>> GetUserChatsAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);
            var chats = await _context.Chats.Where(c=>c.ApplicationUserId == user.Id).ToListAsync();

            return chats;
        }
        public async Task<IEnumerable<Message>> GetChatAsync(string chatId)
        {
            var messages = await _context.Messages.Where(m => m.ChatId == chatId).ToListAsync();

            return messages;
        }
        public async Task<string> DeleteChatAsync(string chatId)
        {
            var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == chatId);

            if (chat == null)
                return string.Empty;

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return "The chat deleted successfully";
        }
    }
}
