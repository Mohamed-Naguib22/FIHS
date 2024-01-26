using FIHS.Models.Auth_Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;

namespace FIHS.Models
{
    public class AuthModel
    {
        public AuthModel()
        {

        }
        public AuthModel(ApplicationUser user, JwtSecurityToken jwtSecurityToken, RefreshToken refreshToken, List<string> roles)
        {
            Email = user.Email;
            Username = user.UserName;
            EmailConfirmed = user.EmailConfirmed;
            IsAuthenticated = true;
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            ExpiresOn = jwtSecurityToken.ValidTo;
            Roles = roles;
            RefreshToken = refreshToken.Token;
            RefreshTokenExpiration = refreshToken.ExpiresOn;
            Succeeded = true;
        }
        [JsonIgnore]
        public string? Message { get; set; }
        [JsonIgnore]
        public bool Succeeded { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool EmailConfirmed { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FirstName { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? LastName { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? PhoneNumber { get; set; }
        public List<string>? Roles { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresOn { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
