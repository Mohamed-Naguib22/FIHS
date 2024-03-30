using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces.IArticle;
using FIHS.Models.ArticleModels;
using FIHS.Models.AuthModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.ArticleServices
{
    public class ArticleInteractionService : BaseService, IArticleInteractionService
    {
        private readonly ApplicationDbContext _context;
        public ArticleInteractionService(ApplicationDbContext context, IMapper mapper, IConfiguration configuration,
            UserManager<ApplicationUser> userManager) : base(userManager, mapper, configuration)
        {
            _context = context;
        }

        public async Task<BaseDto> LikeAsync(int articleId, string refreshToken) 
        {
            var dto = new BaseDto();

            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new BaseDto { Succeeded = false, Message = "Invalid Token." };
            
            if (!await _context.Articles.AnyAsync(a => a.Id == articleId))
                return new BaseDto { Succeeded = false, Message = "هذا المقال غير موجود" };

            var like = await _context.ArticleLikes.FirstOrDefaultAsync(al => al.ArticleId == articleId && al.ApplicationUserId == user.Id);

            if (like == null)
            {
                await _context.ArticleLikes.AddAsync(new ArticleLike { ArticleId = articleId, ApplicationUserId = user.Id });
                dto.Succeeded = true;
                dto.Message = "تم اضافة الاعجاب بنجاح";
            }
            else
            {
                _context.ArticleLikes.Remove(like);
                dto.Succeeded = true;
                dto.Message = "تم ازالة الاعجاب بنجاح";
            }

            await _context.SaveChangesAsync();
            return dto;
        }
    }
}
