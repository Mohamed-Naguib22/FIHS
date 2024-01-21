using Microsoft.AspNetCore.Mvc;
using FIHS.Interfaces;
using FIHS.Dtos;
using FIHS.Models;

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

        [HttpGet("getArticle/{articleId}")]
        public async Task<IActionResult> GetArticleAsync(int articleId)
        {
            var article = await _articleService.GetArticleAsync(articleId);
            return Ok(article);
        }
        [HttpPost("addArticle")]
        public async Task<IActionResult> AddArticleAsync([FromForm] ArticleDto articleDto)
        {
            var article = await _articleService.AddArticleAsync(articleDto);

            return Ok(article);
        }
        [HttpPost("addSection")]
        public async Task<IActionResult> AddSectionAsync([FromBody] ArticleSection section)
        {
            return Ok(await _articleService.AddSectionAsync(section));
        }
        [HttpDelete("deleteArticle/{articleId}")]
        public async Task<IActionResult> DeleteArticleAsync(int articleId)
        {
            var result = await _articleService.DeleteArticleAsync(articleId);

            return Ok(result);
        }
    }
}