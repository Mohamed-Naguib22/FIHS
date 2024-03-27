using AutoMapper;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;
using FIHS.Helpers;
using FIHS.Interfaces;
using FIHS.Interfaces.IUser;
using FIHS.Models.AuthModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace FIHS.Services.UserServices
{
    public class UserService : BaseService, IUserService
    {
        private readonly IImageService _imageService; 
        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, 
            IConfiguration configuration, IImageService imageService, IOptions<JWT> jwt) : base (userManager, mapper, configuration, jwt)
        {
            _imageService = imageService;
        }

        public async Task<UserDto> GetProfileAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "Invalid token." };

            return MapUserToDto(user);
        }

        public async Task<AuthModel> UpdateProfileAsync(string refreshToken, UpdateProfileModel model)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }

            return await MapToAuthModel(user);
        }

        public async Task<AuthModel> ChangePasswordAsync(string refreshToken, ChangePasswordModel model)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            if (!await _userManager.CheckPasswordAsync(user, model.CurrentPassword))
                return new AuthModel { Succeeded = false, Message = "كلمة المرور غير صحيحة" };

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }
            return await MapToAuthModel(user);
        }

        public async Task<UserDto> DeleteAccountAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new UserDto { Succeeded = false, Message = "المستخدم غير موجود" };

            _imageService.DeleteImage(user.ImgUrl);
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return new UserDto { Succeeded = false, Message = "حدث خطأ ما" };

            return new UserDto { Succeeded = true };
        }

        public async Task<AuthModel> SetImageAsync(string refreshToken, IFormFile imgFile)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "المستخدم غير موجود" };

            user.ImgUrl = _imageService.SetImage(imgFile, user.ImgUrl);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return await MapToAuthModel(user);
        }

        public async Task<AuthModel> DeleteImageAsync(string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "المستخدم غير موجود" };
            
            _imageService.DeleteImage(user.ImgUrl);

            user.ImgUrl = "\\images\\Default_User_Image.png";
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return await MapToAuthModel(user);
        }
    }
}
