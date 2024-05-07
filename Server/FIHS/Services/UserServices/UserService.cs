using AutoMapper;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.CommentDtos;
using FIHS.Dtos.UserDtos;
using FIHS.Helpers;
using FIHS.Interfaces;
using FIHS.Interfaces.IUser;
using FIHS.Models.AuthModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace FIHS.Services.UserServices
{
    public class UserService : IUserService
    {
        private const string DEFAUTLT_USER_IMG_PATH = "\\images\\Default_User_Image.png";
        private readonly IImageService _imageService; 
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService(UserManager<ApplicationUser> userManager, 
             IImageService imageService, ITokenService tokenService)
        {
            _imageService = imageService;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<AuthModel> GetProfileAsync(string refreshToken)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            return await _tokenService.CreateAuthModel(user);
        }

        public async Task<AuthModel> UpdateProfileAsync(string refreshToken, UpdateProfileModel model)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                var errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }

            return await _tokenService.CreateAuthModel(user);
        }

        public async Task<AuthModel> ChangePasswordAsync(string refreshToken, ChangePasswordModel model)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            if (!await _userManager.CheckPasswordAsync(user, model.CurrentPassword))
                return new AuthModel { Succeeded = false, Message = "كلمة المرور غير صحيحة" };

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                var errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }
            return await _tokenService.CreateAuthModel(user);
        }

        public async Task<AuthModel> DeleteAccountAsync(string refreshToken)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "المستخدم غير موجود" };

            _imageService.DeleteImage(user.ImgUrl);
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return new AuthModel { Succeeded = true, Message = "تم حذف الحساب بنجاح" };
        }

        public async Task<AuthModel> SetImageAsync(string refreshToken, IFormFile imgFile)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "المستخدم غير موجود" };

            user.ImgUrl = _imageService.SetImage(imgFile, user.ImgUrl);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return await _tokenService.CreateAuthModel(user);
        }

        public async Task<AuthModel> DeleteImageAsync(string refreshToken)
        {
            var user = await _tokenService.GetUserByRefreshToken(refreshToken);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "المستخدم غير موجود" };
            
            _imageService.DeleteImage(user.ImgUrl);

            user.ImgUrl = DEFAUTLT_USER_IMG_PATH;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return await _tokenService.CreateAuthModel(user);
        }

        public async Task<bool> IsUserExist(string userId) => await _userManager.FindByIdAsync(userId) != null;

        public async Task<string> GetUserIdByToken(string token)
        {
             var user = await _tokenService.GetUserByRefreshToken(token);
             return user?.Id ?? "";
        }
    }
}
