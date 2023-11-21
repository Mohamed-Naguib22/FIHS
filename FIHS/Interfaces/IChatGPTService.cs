using FIHS.Models;

namespace FIHS.Interfaces
{
    public interface IChatGPTService
    {
        Task<bool> StartNewConversationAsync(string refreshToken);
        Task<string> AskQuestionAsync(QuestionModel questionModel, string conversationId, string refreshToken);
        Task<IEnumerable<Message>> GetConversationAsync(string conversationId);
    }
}