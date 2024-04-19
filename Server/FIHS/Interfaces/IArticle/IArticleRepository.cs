using FIHS.Models.ArticleModels;

namespace FIHS.Interfaces.IArticle;

public interface IArticleRepository
{
    Task<IEnumerable<Article>> GetAllArticlesAsync();
    Task<IEnumerable<Article>> SearchAsync(string query);
    Task<Article?> GetArticleByIdAsync(int id);
    Task<Article?> GetArticleWithIncludesAsync(int id);
    Task<IEnumerable<Article>> GetSimilarArticlesAsync(int articleId, IEnumerable<string> tags);
    Task<ArticleLike?> GetArticleLikeAsync(int articleId, string userId);
    Task AddLikeAsync(ArticleLike like);
    Task RemoveLikeAsync(ArticleLike like);
    Task AddArticleAsync(Article article);
    Task UpdateArticleAsync(Article article);
    Task RemoveArticleAsync(Article article);
    Task<ArticleSection?> GetSectionAsync(int id);
    Task<ArticleTag?> GetTagAsync(int id);
    Task AddSectionAsync(ArticleSection section);
    Task UpdateSectionAsync(ArticleSection section);
    Task AddTagAsync(ArticleTag tag);
    Task RemoveSectionAsync(ArticleSection section);
    Task RemoveTagAsync(ArticleTag tag);
}
