using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;
using FIHS.Models.AuthModels;

namespace FIHS.Dtos.AuthModels
{
    public class AuthModel
    {
        [JsonIgnore]
        public string? Message { get; set; }
        [JsonIgnore]
        public bool Succeeded { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool EmailConfirmed { get; set; }
        public string? ImgUrl { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public List<string>? Roles { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresOn { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
