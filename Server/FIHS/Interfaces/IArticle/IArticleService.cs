using AutoMapper;
using FHIS.Services;
using FIHS.Dtos;
using FIHS.Dtos.ArticleDtos;
using FIHS.Models.ArticleModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FIHS.Interfaces.IArticle
{
    public interface IArticleService
    {
        Task<(IEnumerable<ReturnArticlesDto>, int? nextPage)> GetAllArticlesAsync(int offest, int limit);
        Task<ReturnArticleDto> GetArticleAsync(int articleId, string? refreshToken);
        Task<BaseDto> LikeAsync(int articleId, string refreshToken);
        Task<(IEnumerable<ReturnArticlesDto>, int? nextPage)> SearchAsync(string query, int offset, int limit);
        Task<Article> AddArticleAsync(AddArticleDto articleDto);
        Task<ArticleTag> AddTagAsync(TagDto tagDto);
        Task<ArticleSection> AddSectionAsync(AddSectionDto sectionDto);
        Task<Article> UpdateArticleAsync(int articleId, UpdateArticleDto articleDto);
        Task<ArticleSection> UpdateSectionAsync(int sectionId, UpdateSectionDto sectionDto);
        Task<bool> DeleteArticleAsync(int articleId);
        Task<bool> DeleteTagAsync(int tagId);
        Task<bool> DeleteSectionAsync(int sectionId);
    }
}