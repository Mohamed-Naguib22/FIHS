using AutoMapper;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;
using FIHS.Helpers;
using FIHS.Interfaces.IUser;
using FIHS.Models.AuthModels;
using FIHS.Models.FavouriteModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace FIHS.Services.UserServices
{
    public class AuthService : BaseService, IAuthService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;
        private readonly IMemoryCache _memoryCache;
        private readonly TimeSpan _CodeExpiration = TimeSpan.FromMinutes(5);
        public AuthService(IConfiguration configuration, UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt, IEmailSender emailSender, 
            IMemoryCache memoryCache, IMapper mapper) : base (userManager, mapper, configuration, jwt)
        {
            _roleManager = roleManager;
            _emailSender = emailSender;
            _memoryCache = memoryCache;
        }

        public async Task<AuthModel> RegisterAysnc(RegisterModel model)
        {
            var registeredUser = await _userManager.FindByEmailAsync(model.Email);
            
            if (registeredUser != null && !await _userManager.IsEmailConfirmedAsync(registeredUser))
                return new AuthModel { IsVerified = false };

            if (registeredUser != null )
                return new AuthModel { Succeeded = false, Message = "البريد الإلكتروني مستخدم بالفعل" };

            var user = _mapper.Map<ApplicationUser>(model);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }

            await _userManager.AddToRoleAsync(user, "User");
            await _userManager.UpdateAsync(user);

            var verificationCode = GenerateRandomCode();

            await _emailSender.SendEmailAsync(user.Email, "Verification Code", $"Your verification code is {verificationCode}");

            _memoryCache.Set($"{user.Id}_VerificationCode", verificationCode, _CodeExpiration);

            return new AuthModel { Succeeded = true, Message = "يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك" };
        }

        public async Task<AuthModel> VerifyAccountAsync(VerifyAccountModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "البريد الإلكتروني غير صحيح" };

            if (!_memoryCache.TryGetValue($"{user.Id}_VerificationCode", out string cachedCode) || model.VerificationCode != cachedCode)
                return new AuthModel { Succeeded = false, Message = "رمز التحقق غير موجود أو انتهت صلاحيته" };

            if(user.EmailConfirmed)
                return new AuthModel { Succeeded = false, Message = "هذا الحساب مفعل بالفعل" };

            user.EmailConfirmed = true;
            user.Favourite = new Favourite { ApplicationUserId = user.Id, CreatedAt = DateTime.Now };

            return await MapToAuthModel(user);
        }

        public async Task<AuthModel> ResendVerificationCodeAsync(EmailModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "البريد الإلكتروني غير صحيح" };

            string key = $"{user.Id}_VerificationCode";

            if (_memoryCache.TryGetValue(key, out _))
                _memoryCache.Remove(key);

            string verificationCode = GenerateRandomCode();

            await _emailSender.SendEmailAsync(user.Email, "Verification Code", $"Your verification code is {verificationCode}");

            _memoryCache.Set(key, verificationCode, _CodeExpiration);

            return new AuthModel { Succeeded = true, Message = "تم ارسال رمز التحقق بنجاح" };
        }

        public async Task<ResetTokenModel> ForgetPasswordAsync(EmailModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new ResetTokenModel { Succeeded = false, Message = "البريد الإلكتروني غير صحيح" };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            string resetPasswordCode = GenerateRandomCode();

            await _emailSender.SendEmailAsync(user.Email, "Reset Password Code", $"Your reset password code is {resetPasswordCode}");

            _memoryCache.Set($"{user.Id}_ResetPasswordCode", resetPasswordCode, _CodeExpiration);

            return new ResetTokenModel { Token = token };
        }

        public async Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "البريد الإلكتروني غير صحيح" };

            if (!_memoryCache.TryGetValue($"{user.Id}_ResetPasswordCode", out string cachedCode) || model.Code != cachedCode)
                return new AuthModel { Succeeded = false, Message = "رمز التحقق غير موجود أو انتهت صلاحيته" };

            var tokenIsValid = await _userManager
                .VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword", model.Token);

            if (!tokenIsValid)
                return new AuthModel { Succeeded = false, Message = "Invalid token" };

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "حدث خطأ ما" };

            return await MapToAuthModel(user);
        }

        public async Task<AuthModel> LoginAsync(TokenrRequestModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return new AuthModel { Succeeded = false, Message = "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
            
            if (!user.EmailConfirmed)
                return new AuthModel{ IsVerified = false };

            return await MapToAuthModel(user);
        }

        public async Task<string> AddRoleAysnc(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "حدث خطأ ما";
        }

        public async Task<AuthModel> RefreshTokenAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid Token" };

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return new AuthModel { Succeeded = false, Message = "Inactive Token" };

            refreshToken.RevokedOn = DateTime.Now;

            return await MapToAuthModel(user);
        }

        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                return false;

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.Now;

            await _userManager.UpdateAsync(user);

            return true;
        }

        private static string GenerateRandomCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }
    }
}
