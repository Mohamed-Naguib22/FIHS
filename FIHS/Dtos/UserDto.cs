using FIHS.Models.Auth_Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    public class UserDto
    {
        [JsonIgnore]
        public string? Message { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
