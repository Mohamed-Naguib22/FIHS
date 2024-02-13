using FIHS.Interfaces.IArticle;
using FIHS.Models.ArticleModels;
using FIHS.Models.AuthModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.ArticleServices
{
    public class ArticleInteractionService : BaseService, IArticleInteractionService
    {
        public ArticleInteractionService(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : base(context, userManager)
        {
        }

        public async Task<bool> LikeAsync(int articleId, string refreshToken) 
        {
            var user = await GetUserByRefreshToken(refreshToken);

            var isLiked = await _context.ArticleLikes.AnyAsync(al => al.ArticleId == articleId && al.ApplicationUserId == user.Id);

            if (isLiked)
                return false;

            var like = new ArticleLike
            {
                ArticleId = articleId,
                ApplicationUserId = user.Id,
            };

            await _context.ArticleLikes.AddAsync(like);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<bool> RemoveLikeAsync(int articleId, string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            var like = await _context.ArticleLikes.FirstOrDefaultAsync(al => al.ArticleId == articleId && al.ApplicationUserId == user.Id);

            if (like == null)
                return false;

            _context.ArticleLikes.Remove(like);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
