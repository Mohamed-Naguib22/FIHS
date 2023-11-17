using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.AspNetCore.Identity;

namespace FIHS.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IImageService<ApplicationUser> _userImageService;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, 
            IImageService<ApplicationUser> userImageService, IMapper mapper)
        {
            _userManager = userManager;
            _userImageService = userImageService;
            _mapper = mapper;
        }

        public async Task<UserDto> UpdateProfileAsync(string userId, UpdateProfileModel model)
        {
            var user = await _userManager.FindByIdAsync(userId);

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
        public async Task<bool> DeleteAccountAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return false;

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
        public async Task<bool> SetImageAsync(string userId, IFormFile imgFile)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return false;

            _userImageService.SetImage(user, imgFile);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
        public async Task<bool> DeleteImageAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return false;

            _userImageService.DeleteImage(user);

            user.ProfilePicture = "\\images\\No_Image.png";

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return false;

            return true;
        }
    }
}
