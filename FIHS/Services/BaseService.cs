using AutoMapper;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.AspNetCore.Identity;

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
    }
}
