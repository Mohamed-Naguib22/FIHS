using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FIHS.Interfaces;
using Microsoft.IdentityModel.Tokens;
using FIHS.Models.ChatGPT;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatGPTController : ControllerBase
    {
        private readonly IChatGPTService _chatGPTService;
        public ChatGPTController(IChatGPTService chatGPTService)
        {
            _chatGPTService = chatGPTService;
        }
        [HttpGet("newChat")]
        public async Task<IActionResult> NewChatAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _chatGPTService.NewChatAsync(refreshToken);

            return Ok(result);
        }
        [HttpPost("ask/{chatId}")]
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel, string chatId)
        {
            if (string.IsNullOrEmpty(chatId) || !Guid.TryParse(chatId, out _))
                return BadRequest("Invalid chat Id");

            if (questionModel == null)
                return BadRequest("Querstion is required!");

            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _chatGPTService.AskQuestionAsync(questionModel, chatId, refreshToken);

            if (!string.IsNullOrEmpty(result.Message))
                return StatusCode(result.StatusCode, result.Message);

            return Ok(result);
        }
        [HttpGet("userChats")]
        public async Task<IActionResult> GetUserChatsAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var chats = await _chatGPTService.GetUserChatsAsync(refreshToken);

            return Ok(chats);
        }
        [HttpGet("getChat/{chatId}")]
        public async Task<IActionResult> GetChatAsync(string chatId)
        {
            if (string.IsNullOrEmpty(chatId) || !Guid.TryParse(chatId, out _))
                return BadRequest("Invalid chat Id");

            var messages = await _chatGPTService.GetChatAsync(chatId);

            return Ok(messages);
        }
        [HttpDelete("deleteChat/{chatId}")]
        public async Task<IActionResult> DeleteChatAsync(string chatId)
        {
            if (string.IsNullOrEmpty(chatId) || !Guid.TryParse(chatId, out _))
                return BadRequest("Invalid chat Id");

            var result = await _chatGPTService.DeleteChatAsync(chatId);

            if (result.IsNullOrEmpty())
                return NotFound("Chat is not found");

            return Ok(result);
        }
    }
}