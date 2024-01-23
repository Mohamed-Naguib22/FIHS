using AutoMapper;
using FHIS.Services;
using FIHS.Dtos;
using FIHS.Models;

namespace FIHS.Interfaces
{
    public interface IArticleService
    {
        Task<IEnumerable<Article>> GetAllArticlesAsync();
        Task<Article> GetArticleAsync(int articleId);
        Task<IEnumerable<Article>> SearchAsync(string query);
        Task<Article> AddArticleAsync(ArticleDto articleDto);
        Task<ArticleSection> AddSectionAsync(ArticleSectionDto sectionDto);
        Task<Article> UpdateArticleAsync(int articleId, ArticleDto articleDto);
        Task<ArticleSection> UpdateSectionAsync(int sectionId, ArticleSectionDto sectionDto);
        Task<bool> DeleteArticleAsync(int articleId);
        Task<bool> DeleteSectionAsync(int sectionId);
    }
}