using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos
{
    public class ResetPasswordModel
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Token { get; set; }
        [StringLength(128)]
        public string NewPassword { get; set; }
    }
}