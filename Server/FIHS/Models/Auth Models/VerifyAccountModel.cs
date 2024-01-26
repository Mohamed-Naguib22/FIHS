using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.Auth_Models
{
    public class VerifyAccountModel
    {
        [EmailAddress, StringLength(128)]
        public string Email { get; set; }
        [StringLength(6, MinimumLength = 6)]
        public string VerificationCode { get; set; }
    }
}
