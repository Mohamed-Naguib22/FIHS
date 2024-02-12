namespace FIHS.Interfaces.IArticle
{
    public interface IArticleInteractionService
    {
        Task<bool> LikeAsync(int articleId, string refreshToken);
        Task<bool> RemoveLikeAsync(int articleId, string refreshToken);
    }
}
