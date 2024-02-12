using AutoMapper;
using FIHS.Interfaces;
using FIHS.Models.AuthModels;
using Google.Cloud.Translation.V2;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class BaseService
    {
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly ApplicationDbContext _context;
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly IMapper _mapper;
        protected readonly IImageService _imageService;

        public BaseService(ApplicationDbContext context = null, 
            UserManager<ApplicationUser> userManager = null, 
            IMapper mapper = null, IImageService imageService = null)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _imageService = imageService;
        }
        protected async Task<ApplicationUser?> GetUserByRefreshToken(string refreshToken)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }
        protected string TranslateText(string text, string targetLanguage)
        {
            TranslationClient client = TranslationClient.Create();
            TranslationResult result = client.TranslateText(text, targetLanguage);
            return result.TranslatedText;
        }
    }
}
