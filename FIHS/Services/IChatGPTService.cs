using FIHS.Models;

namespace FIHS.Services
{
    public interface IChatGPTService
    {
        Task<bool> StartNewConversationAsync(string userId);
        Task<string> AskQuestionAsync(QuestionModel questionModel, int conversationId, string userId);
        Task<IEnumerable<Message>> GetConversationAsync(int conversationId);
    }
}