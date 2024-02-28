using Microsoft.AspNetCore.Mvc;
using CarShopAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using FIHS.Dtos.ArticleDtos;
using FIHS.Interfaces.IArticle;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly IArticleInteractionService _articleInteractionService;

        public ArticleController(IArticleService articleService, IArticleInteractionService articleInteractionService)
        {
            _articleService = articleService;
            _articleInteractionService = articleInteractionService;
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
            var refreshToken = Request.Cookies["refreshToken"];

            var result = await _articleService.GetArticleAsync(articleId, refreshToken);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchAsync([FromQuery] string query)
        {
            var articles = await _articleService.SearchAsync(query);

            return Ok(articles);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> AddArticleAsync([FromForm] AddArticleDto articleDto)
        {
            var modelValidation = ValidationHelper<AddArticleDto>.Validate(articleDto);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var article = await _articleService.AddArticleAsync(articleDto);

            return Ok(article);
        }

        //[Authorize(Roles = "Admin")]
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

        [HttpGet("like/{articleId}")]
        public async Task<IActionResult> LikeAsync(int articleId)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _articleInteractionService.LikeAsync(articleId, refreshToken);

            if (!result)
                return BadRequest("·ﬁœ ﬁ„  »«·«⁄Ã«»  »Â–« «·„ﬁ«· »«·›⁄·");

            return Ok(" „ «÷«›… «·«⁄Ã«» »‰Ã«Õ");
        }

        [HttpDelete("remove-like/{articleId}")]
        public async Task<IActionResult> RemoveLikeAsync(int articleId)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _articleInteractionService.RemoveLikeAsync(articleId, refreshToken);

            if (!result)
                return BadRequest("«‰  ·„  ﬁ„ »«·«⁄Ã«» »Â–« «·„ﬁ«·");

            return Ok(" „ «“«·… «·«⁄Ã«» »‰Ã«Õ");
        }
    }
}