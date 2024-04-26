using FIHS.Models;
using FIHS.Models.ChatGPT;

namespace FIHS.Interfaces.IChat
{
    public interface IChatbotService
    {
        Task<AnswerModel> AskQuestionAsync(QuestionModel questionModel);
    }
}