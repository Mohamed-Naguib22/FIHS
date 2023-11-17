using System.ComponentModel.DataAnnotations;

namespace FIHS.Models
{
    public class TokenrRequestModel
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}