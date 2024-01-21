using FIHS.Models;
using FIHS.Models.ChatGPT;

namespace FIHS.Interfaces
{
    public interface IChatGPTService
    {
        Task<Chat> NewChatAsync(string refreshToken);
        Task<AnswerModel> AskQuestionAsync(QuestionModel questionModel, string chatnId, string refreshToken);
        Task<IEnumerable<Message>> GetChatAsync(string chatnId);
        Task<IEnumerable<Chat>> GetUserChatsAsync(string refreshToken);
        Task<string> DeleteChatAsync(string chatnId);
    }
}