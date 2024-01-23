using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly string _baseUrl;
        public UserService(UserManager<ApplicationUser> userManager, 
            IImageService imageService, IMapper mapper, IConfiguration configuration) : base(context: null, userManager, mapper, imageService)
        {
            _baseUrl = configuration["BaseUrl"];
        }

        private async Task<ApplicationUser?> GetUserByRefreshToken(string refreshToken)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }

        private UserDto MapUserToDto(ApplicationUser user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            userDto.ProfilePicture = _baseUrl + user.ProfilePicture;
            userDto.Succeeded = true;
            return userDto;
        }

        public async Task<UserDto> GetProfileAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "Invalid token." };

            return MapUserToDto(user);
        }

        public async Task<UserDto> UpdateProfileAsync(string refreshToken, UpdateProfileModel model)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "Invalid token." };

            user.UserName = model.Username ?? user.UserName;
            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new UserDto { Succeeded = false, Message = errorMessage };
            }

            return MapUserToDto(user);
        }

        public async Task<UserDto> DeleteAccountAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "User not found"};

            _imageService.DeleteImage(user.ProfilePicture);
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return new UserDto { Succeeded = false, Message = "Something went wrong" };

            return new UserDto { Succeeded = true};
        }

        public async Task<UserDto> SetImageAsync(string refreshToken, IFormFile imgFile)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "User not found" };

            user.ProfilePicture = _imageService.SetImage(imgFile, user.ProfilePicture);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new UserDto { Succeeded = false, Message = "Something went wrong" };

            return new UserDto { Succeeded = true };
        }

        public async Task<UserDto> DeleteImageAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "User not found" };

            _imageService.DeleteImage(user.ProfilePicture);

            user.ProfilePicture = "\\images\\Default_User_Image.png";
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new UserDto { Succeeded = false, Message = "Something went wrong" };

            return new UserDto { Succeeded = true };
        }
    }
}
