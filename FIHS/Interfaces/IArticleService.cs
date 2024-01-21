using AutoMapper;
using FHIS.Services;
using FIHS.Dtos;
using FIHS.Models;

namespace FIHS.Interfaces
{
    public interface IArticleService
    {
        Task<Article> GetArticleAsync(int articleId);

        Task<Article> AddArticleAsync(ArticleDto inputDto);

        Task<ArticleSection> AddSectionAsync(ArticleSection section);

        Task<string> DeleteArticleAsync(int articleId);
    }
}