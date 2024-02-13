using FIHS.Models;
using FIHS.Models.ChatGPT;

namespace FIHS.Interfaces.IChat
{
    public interface IChatGPTService
    {
        Task<AnswerModel> AskQuestionAsync(QuestionModel questionModel);
    }
}