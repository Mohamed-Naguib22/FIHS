using Microsoft.AspNetCore.Mvc;
using FIHS.Interfaces;
using FIHS.Dtos;
using CarShopAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using FIHS.Dtos.Article;

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
        public async Task<IActionResult> GetAllArticlesAsync()
        {
            var articles = await _articleService.GetAllArticlesAsync();

            return Ok(articles);
        }

        [HttpGet("get/{articleId}")]
        public async Task<IActionResult> GetArticleAsync(int articleId)
        {
            var article = await _articleService.GetArticleAsync(articleId);

            if (article == null)
                return BadRequest("Â–« «·„ﬁ«· €Ì— „ÊÃÊœ");

            return Ok(article);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchAsync([FromQuery] string query)
        {
            var articles = await _articleService.SearchAsync(query);

            return Ok(articles);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> AddArticleAsync([FromForm] ArticleDto articleDto)
        {
            var modelValidation = ValidationHelper<ArticleDto>.Validate(articleDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var article = await _articleService.AddArticleAsync(articleDto);

            return Ok(article);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-section")]
        public async Task<IActionResult> AddSectionAsync([FromBody] ArticleSectionDto sectionDto)
        {
            var modelValidation = ValidationHelper<ArticleSectionDto>.Validate(sectionDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            return Ok(await _articleService.AddSectionAsync(sectionDto));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update/{articleId}")]
        public async Task<IActionResult> UpdateArticleAsync(int articleId, [FromForm] ArticleDto articleDto)
        {
            var modelValidation = ValidationHelper<ArticleDto>.Validate(articleDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var article = await _articleService.UpdateArticleAsync(articleId, articleDto);

            if (article == null)
                return BadRequest("Â–« «·„ﬁ«· €Ì— „ÊÃÊœ");

            return Ok(article);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-section/{sectionId}")]
        public async Task<IActionResult> UpdateSectionAsync(int sectionId, [FromBody] ArticleSectionDto sectionDto)
        {
            var modelValidation = ValidationHelper<ArticleSectionDto>.Validate(sectionDto);
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