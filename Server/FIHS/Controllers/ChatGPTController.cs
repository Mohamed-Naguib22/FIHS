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
    public class ChatGPTController : ControllerBase
    {
        private readonly IChatGPTService _chatGPTService;
        public ChatGPTController(IChatGPTService chatGPTService)
        {
            _chatGPTService = chatGPTService;
        }
        [HttpPost("ask")]
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel)
        {
            var result = await _chatGPTService.AskQuestionAsync(questionModel);

            if (!string.IsNullOrEmpty(result.Message))
                return StatusCode(result.StatusCode, result.Message);

            return Ok(result);
        }
    }
}