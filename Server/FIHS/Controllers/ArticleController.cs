using Microsoft.AspNetCore.Mvc;
using CarShopAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using FIHS.Dtos.ArticleDtos;
using FIHS.Interfaces.IArticle;
using OpenAI_API.Moderation;
using System.Text.Json;
using FIHS.Models.ArticleModels;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllArticlesAsync([FromQuery] int offset, [FromQuery] int limit)
        {
            var(articles, nextPage) = await _articleService.GetAllArticlesAsync(offset, limit);
            return Ok(new { Articles = articles, NextPage = nextPage });
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("get/{articleId}")]
        public async Task<IActionResult> GetArticleAsync(int articleId)
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var result = await _articleService.GetArticleAsync(articleId, refreshToken);

            return result.Succeeded ? Ok(result) : NotFound(result.Message);
        }

        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet("like/{articleId}")]
        public async Task<IActionResult> LikeAsync(int articleId)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _articleService.LikeAsync(articleId, refreshToken);

            return result.Succeeded ? Ok(result.Message) : NotFound(result.Message);
        }

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchAsync([FromQuery] string query, [FromQuery] int offset, [FromQuery] int limit)
        {
            var (articles, nextPage) = await _articleService.SearchAsync(query, offset, limit);
            return Ok(new { Articles = articles, NextPage = nextPage });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> AddArticleAsync([FromForm] AddArticleDto articleDto)
        {
            var modelValidation = ValidationHelper<AddArticleDto>.Validate(articleDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var article = await _articleService.AddArticleAsync(articleDto);

            return Ok(article);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-tag")]
        public async Task<IActionResult> AddTagAsync([FromBody] TagDto tagDto)
        {
            var modelValidation = ValidationHelper<TagDto>.Validate(tagDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var tag = await _articleService.AddTagAsync(tagDto);

            return Ok(tag);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-section")]
        public async Task<IActionResult> AddSectionAsync([FromBody] AddSectionDto sectionDto)
        {
            var modelValidation = ValidationHelper<AddSectionDto>.Validate(sectionDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            return Ok(await _articleService.AddSectionAsync(sectionDto));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update/{articleId}")]
        public async Task<IActionResult> UpdateArticleAsync(int articleId, [FromForm] UpdateArticleDto articleDto)
        {
            var modelValidation = ValidationHelper<UpdateArticleDto>.Validate(articleDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var article = await _articleService.UpdateArticleAsync(articleId, articleDto);

            if (article == null)
                return BadRequest("Â–« «·„ﬁ«· €Ì— „ÊÃÊœ");

            return Ok(article);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-section/{sectionId}")]
        public async Task<IActionResult> UpdateSectionAsync(int sectionId, [FromBody] UpdateSectionDto sectionDto)
        {
            var modelValidation = ValidationHelper<UpdateSectionDto>.Validate(sectionDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var section = await _articleService.UpdateSectionAsync(sectionId, sectionDto);

            if (section == null)
                BadRequest("Â–« «·ﬁ”„ €Ì— „ÊÃÊœ");

            return Ok(section);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{articleId}")]
        public async Task<IActionResult> DeleteArticleAsync(int articleId)
        {
            var result = await _articleService.DeleteArticleAsync(articleId);

            if (!result)
                BadRequest("Â–« «·„ﬁ«· €Ì— „ÊÃÊœ");

            return Ok(" „ Õ–› «·„ﬁ«· »‰Ã«Õ");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-tag/{tagId}")]
        public async Task<IActionResult> DeleteTagAsync(int tagId)
        {
            var result = await _articleService.DeleteTagAsync(tagId);

            if (!result)
                BadRequest("€Ì— „ÊÃÊœ");

            return Ok(" „ «·Õ–› »‰Ã«Õ");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-section/{sectionId}")]
        public async Task<IActionResult> DeleteSectionAsync(int sectionId)
        {
            var result = await _articleService.DeleteSectionAsync(sectionId);

            if (!result)
                BadRequest("Â–« «·ﬁ”„ €Ì— „ÊÃÊœ");

            return Ok(" „ Õ–› «·ﬁ”„ »‰Ã«Õ");
        }
    }
}