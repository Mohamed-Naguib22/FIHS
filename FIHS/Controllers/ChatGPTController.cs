using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;
using FIHS.Models;
using Microsoft.AspNetCore.Authorization;
using FIHS.Services;

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
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            var result = await _chatGPTService.StartNewConversationAsync(userId);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Lest's Talk!!");
        }
        [HttpPost("ask/{conversationId}")]
        public async Task<IActionResult> AskQuestionAsync([FromForm] QuestionModel questionModel, int conversationId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            var answer = await _chatGPTService.AskQuestionAsync(questionModel, conversationId, userId);

            if (string.IsNullOrEmpty(answer))
            {
                return StatusCode(503, "Chat GPT service is unavailable");
            }

            return Ok(answer);
        }
        [HttpGet("conversation/{conversationId}")]
        public async Task<IActionResult> GetConversationAsync(int conversationId)
        {
            var messages = await _chatGPTService.GetConversationAsync(conversationId);

            return Ok(messages);
        }
    }
}