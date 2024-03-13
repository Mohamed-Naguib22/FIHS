using AutoMapper;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;
using FIHS.Helpers;
using FIHS.Interfaces;
using FIHS.Models.AuthModels;
using Google.Cloud.Translation.V2;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FIHS.Services
{
    public class BaseService
    {
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly IMapper _mapper;
        protected readonly string _baseUrl;
        private readonly JWT _jwt;

        public BaseService(UserManager<ApplicationUser> userManager, 
            IMapper mapper, IConfiguration configuration, IOptions<JWT> jwt =  null)
        {
            _mapper = mapper;
            _userManager = userManager;
            _baseUrl = configuration["BaseUrl"];
            _jwt = jwt?.Value;
        }
        protected async Task<ApplicationUser?> GetUserByRefreshToken(string refreshToken)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }
        protected string GetBaseUrl()
        {
            return _baseUrl;
        }
        protected UserDto MapUserToDto(ApplicationUser user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            userDto.ImgUrl = _baseUrl + user.ImgUrl;
            userDto.Succeeded = true;
            return userDto;
        }
        protected async Task<AuthModel> MapToAuthModel(ApplicationUser user)
        {
            var jwtSecurityToken = await CreateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);
            RefreshToken refreshToken;

            if (user.RefreshTokens.Any(t => t.IsActive))
            {
                refreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
            }
            else
            {
                refreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
            }

            var authModel = _mapper.Map<AuthModel>(user);
            authModel.IsAuthenticated = true;
            authModel.IsVerified = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.RefreshToken = refreshToken.Token;
            authModel.RefreshTokenExpiration = refreshToken.ExpiresOn;
            authModel.Roles = roles.ToList();
            authModel.ImgUrl = _baseUrl + user.ImgUrl;
            authModel.Succeeded = true;
            return authModel;
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
                ExpiresOn = DateTime.Now.AddDays(10),
                CreatedOn = DateTime.Now
            };
        }
    }
}
