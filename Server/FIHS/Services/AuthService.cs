using AutoMapper;
using FIHS.Dtos;
using FIHS.Helpers;
using FIHS.Interfaces;
using FIHS.Models;
using FIHS.Models.Auth_Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FIHS.Services
{
    public class AuthService : BaseService, IAuthService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        private readonly IEmailSender _emailSender;
        private readonly IMemoryCache _memoryCache;
        private readonly TimeSpan _CodeExpiration = TimeSpan.FromMinutes(15);

        public AuthService(UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IOptions<JWT> jwt,
            IEmailSender emailSender,
            IMemoryCache memoryCache,
            IMapper mapper) : base(context: null, userManager, mapper)
        {
            _roleManager = roleManager;
            _jwt = jwt.Value;
            _emailSender = emailSender;
            _memoryCache = memoryCache;
        }
        public async Task<AuthModel> RegisterAysnc(RegisterModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return new AuthModel { Succeeded = false, Message = "Email is already registered!" };

            if (await _userManager.FindByEmailAsync(model.Username) != null)
                return new AuthModel { Succeeded = false, Message = "Username is already registered!" };

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

            string verificationCode = GenerateRandomCode();

            await _emailSender.SendEmailAsync(user.Email, "Verification Code",$"Your verification code is {verificationCode}");

            _memoryCache.Set($"{user.Id}_VerificationCode", verificationCode, _CodeExpiration);

            return new AuthModel{ Succeeded = true };
        }
        public async Task<AuthModel> VerifyAccountAsync(VerifyAccountModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Email is not found" };

            if (!_memoryCache.TryGetValue($"{user.Id}_VerificationCode", out string cachedCode))
                return new AuthModel { Succeeded = false, Message = "Verification code not found or expired" };

            if (model.VerificationCode != cachedCode)
                return new AuthModel { Succeeded = false, Message = "Verification code not found or expired" };

            user.EmailConfirmed = true;

            var jwtSecurityToken = await CreateJwtToken(user);

            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);

            await _userManager.UpdateAsync(user);

            return new AuthModel(user, jwtSecurityToken, refreshToken, new List<string> { "User" });
        }

        public async Task<AuthModel> ResendVerificationCodeAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Email is not found" };

            if (_memoryCache.TryGetValue($"{user.Id}_VerificationCode", out string cachedCode))
            {
                await _emailSender.SendEmailAsync(user.Email, "Verification Code", $"Your verification code is {cachedCode}");
                return new AuthModel { Succeeded = true };
            }

            string verificationCode = GenerateRandomCode();

            await _emailSender.SendEmailAsync(user.Email, "Verification Code", $"Your verification code is {verificationCode}");

            _memoryCache.Set($"{user.Id}_VerificationCode", verificationCode, _CodeExpiration);

            return new AuthModel { Succeeded = true };
        }

        public async Task<ResetTokenModel> ForgetPasswordAsync(ForgetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new ResetTokenModel { Succeeded = false, Message = "Email is incorrect" };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _emailSender.SendEmailAsync(user.Email, "Password Reset",
                $"Please reset your password by <a href=''>clicking here</a>.");

            return new ResetTokenModel { Token = token };
        }

        public async Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Email is incorrect" };

            var tokenIsValid = await _userManager
                .VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider,"ResetPassword", model.Token);

            if (!tokenIsValid)
                return new AuthModel { Succeeded = false, Message = "Invalid token" };

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return new AuthModel { Succeeded = false, Message = "Something went wrong" };

            return new AuthModel { Succeeded = true };
        }

        public async Task<AuthModel> LoginAsync(TokenrRequestModel model)
        {
			var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password) || !user.EmailConfirmed)
                return new AuthModel { Succeeded = false, Message = "Email or Password is incorrect" };

            var jwtSecurityToken = await CreateJwtToken(user);
			var roles = await _userManager.GetRolesAsync(user);

            if (user.RefreshTokens.Any(t => t.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                return new AuthModel(user, jwtSecurityToken, activeRefreshToken, roles.ToList());
            }
            else
            {
                var refreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
                return new AuthModel(user, jwtSecurityToken, refreshToken, roles.ToList());
            }
        }
        public async Task<string> AddRoleAysnc(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "Something went wrong";
        }
        public async Task<AuthModel> ChangePasswordAsync(string userId, ChangePasswordModel model)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return new AuthModel { Succeeded = false, Message = "Invalid token." };

            if (!await _userManager.CheckPasswordAsync(user, model.CurrentPassword))
                return new AuthModel { Succeeded = false, Message = "Password is incorrect." };

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(r => r.Description).ToList();
                string errorMessage = string.Join(", ", errors);
                return new AuthModel { Succeeded = false, Message = errorMessage };
            }

            var jwtSecurityToken = await CreateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);

            if (user.RefreshTokens.Any(t => t.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                return new AuthModel(user, jwtSecurityToken, activeRefreshToken, roles.ToList());
            }
            else
            {
                var refreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
                return new AuthModel(user, jwtSecurityToken, refreshToken, roles.ToList());
            }
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

            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _userManager.UpdateAsync(user);

            var jwtSecurityToken = await CreateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);

            return new AuthModel(user, jwtSecurityToken, refreshToken, roles.ToList());
        }
        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                return false;

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow;

            await _userManager.UpdateAsync(user);

            return true;
        }
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
            {
                roleClaims.Add(new Claim("roles", role));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.DurationInDays),
                signingCredentials: signingCredentials
                );
            return jwtSecurityToken;
        }
        private static RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var generator = new RNGCryptoServiceProvider();

            generator.GetBytes(randomNumber);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiresOn = DateTime.UtcNow.AddDays(10),
                CreatedOn = DateTime.UtcNow
            };
        }

        private static string GenerateRandomCode()
        {
            var random = new Random();
            string code = random.Next(100000, 999999).ToString();
            return code;
        }
    }
}
