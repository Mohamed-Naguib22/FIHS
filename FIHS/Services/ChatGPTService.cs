using FIHS.Models;
using OpenAI_API.Completions;
using OpenAI_API;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FIHS.Interfaces;
using NuGet.Common;

namespace FIHS.Services
{
    public class ChatGPTService : IChatGPTService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public ChatGPTService(ApplicationDbContext context, 
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) 
        {
            _context= context;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<bool> StartNewConversationAsync(string refreshToken)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return false;

            var conversation = new Conversation
            {
                Id = Guid.NewGuid().ToString(),
                ApplicationUserId = user.Id,
                Timestamp= DateTime.UtcNow,
            };

            await _context.Conversations.AddAsync(conversation);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<string> AskQuestionAsync(QuestionModel questionModel, string conversationId, string refreshToken)
        {
            try
            {
                var apiKey = _configuration["ApiKeys:ChatGPT"];
                var openAI = new OpenAIAPI(apiKey);
                var completion = new CompletionRequest
                {
                    Prompt = questionModel.Question,
                    Model = OpenAI_API.Models.Model.DavinciText,
                    MaxTokens = 500
                };

                var result = await openAI.Completions.CreateCompletionAsync(completion);

                var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

                if (user == null)
                    return string.Empty;

                if (result?.Completions != null && result.Completions.Count > 0)
                {
                    var answer = result.Completions[0].Text;

                    var question = new Message
                    {
                        ConversationId = conversationId,
                        Content = questionModel.Question,
                        Sender = user.UserName,
                        Timestamp = DateTime.UtcNow
                    };

                    var response = new Message
                    {
                        ConversationId = conversationId,
                        Content = answer,
                        Sender = "Chatbot",
                        Timestamp = DateTime.UtcNow
                    };

                    await _context.Messages.AddAsync(question);
                    await _context.Messages.AddAsync(response);
                    await _context.SaveChangesAsync();
                    return answer;
                }
                else
                {
                    return string.Empty;
                }
            }
            catch
            {
                return string.Empty;
            }
        }
        public async Task<IEnumerable<Message>> GetConversationAsync(string conversationId)
        {
            var messages = await _context.Messages.
                Where(m => m.ConversationId == conversationId)
                .ToListAsync();

            return messages;
        }
    }
}
