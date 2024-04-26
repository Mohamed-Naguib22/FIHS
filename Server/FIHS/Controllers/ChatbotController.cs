using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using FIHS.Models.ChatGPT;
using CarShopAPI.Helpers;
using FIHS.Dtos;
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
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel)
        {
            var result = await _chatbotService.AskQuestionAsync(questionModel);

            return result.Succeeded ? Ok(result) : StatusCode(result.StatusCode, result.Message);
        }
    }
}