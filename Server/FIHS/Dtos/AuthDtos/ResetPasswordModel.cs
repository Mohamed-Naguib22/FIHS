using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.AuthModels
{
    public class ResetPasswordModel
    {
        [EmailAddress, StringLength(128)]
        public string Email { get; set; }
        public string Token { get; set; }
        [StringLength(6, MinimumLength = 6, ErrorMessage = "The code must be 6 digits")]
        public string Code { get; set; }
        [StringLength(128)]
        public string NewPassword { get; set; }
    }
}