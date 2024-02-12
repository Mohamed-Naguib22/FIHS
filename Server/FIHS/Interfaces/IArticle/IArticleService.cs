using AutoMapper;
using FHIS.Services;
using FIHS.Dtos.ArticleDtos;
using FIHS.Models.ArticleModels;

namespace FIHS.Interfaces.IArticle
{
    public interface IArticleService
    {
        Task<IEnumerable<ReturnArticleDto>> GetAllArticlesAsync();
        Task<ReturnArticleDto> GetArticleAsync(int articleId);
        Task<IEnumerable<ReturnArticleDto>> SearchAsync(string query);
        Task<Article> AddArticleAsync(AddArticleDto articleDto);
        Task<ArticleTag> AddTagAsync(TagDto tagDto);
        Task<ArticleSection> AddSectionAsync(SectionDto sectionDto);
        Task<Article> UpdateArticleAsync(int articleId, UpdateArticleDto articleDto);
        Task<ArticleSection> UpdateSectionAsync(int sectionId, SectionDto sectionDto);
        Task<bool> DeleteArticleAsync(int articleId);
        Task<bool> DeleteTagAsync(int tagId);
        Task<bool> DeleteSectionAsync(int sectionId);
    }
}