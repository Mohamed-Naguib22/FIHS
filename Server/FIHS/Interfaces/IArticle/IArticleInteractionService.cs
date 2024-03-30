using FIHS.Dtos;

namespace FIHS.Interfaces.IArticle
{
    public interface IArticleInteractionService
    {
        Task<BaseDto> LikeAsync(int articleId, string refreshToken);
    }
}
