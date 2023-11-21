using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;
using FIHS.Models;
using Microsoft.AspNetCore.Authorization;
using FIHS.Interfaces;

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
        [HttpGet("newConversation")]
        public async Task<IActionResult> StartNewConversationAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _chatGPTService.StartNewConversationAsync(refreshToken);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Lest's Talk!!");
        }
        [HttpPost("ask/{conversationId}")]
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel, string conversationId)
        {
            if(!Guid.TryParse(conversationId, out Guid result))
            {
                return BadRequest("Invalid conversion Id");
            }

            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var answer = await _chatGPTService.AskQuestionAsync(questionModel, conversationId, refreshToken);

            if (string.IsNullOrEmpty(answer))
            {
                return StatusCode(503, "Chat GPT service is unavailable");
            }

            return Ok(answer);
        }
        [HttpGet("conversation/{conversationId}")]
        public async Task<IActionResult> GetConversationAsync(string conversationId)
        {
            var messages = await _chatGPTService.GetConversationAsync(conversationId);

            return Ok(messages);
        }
    }
}