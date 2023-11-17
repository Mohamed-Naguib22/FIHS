using FIHS.Models.Auth_Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Newtonsoft.Json;
using OpenAI_API.Chat;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIHS.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(256), DataType(DataType.ImageUrl)]
        public string? ProfilePicture { get; set; }
        public List<RefreshToken>? RefreshTokens { get; set; }
        public IEnumerable<Conversation>? Conversations { get; set; }
    }
}
