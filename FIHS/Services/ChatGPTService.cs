using FIHS.Models;
using OpenAI_API.Completions;
using OpenAI_API;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class ChatGPTService : IChatGPTService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly string APIKey = "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";
        public ChatGPTService(ApplicationDbContext context, UserManager<ApplicationUser> userManager) 
        {
            _context= context;
            _userManager = userManager;
        }

        public async Task<bool> StartNewConversationAsync(string userId)
        {
            var conversation = new Conversation
            {
                ApplicationUserId = userId,
                Timestamp= DateTime.UtcNow,
            };

            await _context.Conversations.AddAsync(conversation);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<string> AskQuestionAsync(QuestionModel questionModel, int conversationId, string userId)
        {
            try
            {
                var openAI = new OpenAIAPI(APIKey);
                var completion = new CompletionRequest
                {
                    Prompt = questionModel.Question,
                    Model = OpenAI_API.Models.Model.DavinciText,
                    MaxTokens = 500
                };

                var result = await openAI.Completions.CreateCompletionAsync(completion);

                var user = await _userManager.FindByIdAsync(userId);

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
        public async Task<IEnumerable<Message>> GetConversationAsync(int conversationId)
        {
            var messages = await _context.Messages.
                Where(m => m.ConversationId == conversationId)
                .ToListAsync();

            return messages;
        }
    }
}
