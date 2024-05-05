using Microsoft.AspNetCore.Mvc;
using FIHS.Models.ChatGPT;
using FIHS.Interfaces.IChat;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;
        public ChatbotController(IChatbotService chatbotService)
        {
            _chatbotService = chatbotService;
        }

        [HttpPost("gemini")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel)
        {
            var result = await _chatbotService.AskQuestionAsync(questionModel);

            return result.Succeeded ? Ok(result) : StatusCode(result.StatusCode, result.Message);
        }
    }
}