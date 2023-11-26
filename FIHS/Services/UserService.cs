using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace FIHS.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IImageService _userImageService;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, 
            IImageService userImageService, IMapper mapper)
        {
            _userManager = userManager;
            _userImageService = userImageService;
            _mapper = mapper;
        }
        public async Task<UserDto> GetProfileAsync(string refreshToken)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return new UserDto { Message = "Invalid token." };

            var userDto = _mapper.Map<UserDto>(user);
            userDto.ProfilePicture = "https://localhost:7184" + user.ProfilePicture;
            return userDto;
        }

        public async Task<UserDto> UpdateProfileAsync(string refreshToken, UpdateProfileModel model)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return new UserDto { Message = "Invalid token." };

            user.UserName = model.Username ?? user.UserName;
            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new UserDto { Message = errorMessage };
            }

            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
        public async Task<bool> DeleteAccountAsync(string refreshToken)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return false;

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
        public async Task<bool> SetImageAsync(string refreshToken, IFormFile imgFile)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return false;

            user.ProfilePicture = _userImageService.SetImage(user.ProfilePicture, imgFile);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
        public async Task<bool> DeleteImageAsync(string refreshToken)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return false;

            _userImageService.DeleteImage(user.ProfilePicture);

            user.ProfilePicture = "\\images\\No_Image.png";

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
    }
}
