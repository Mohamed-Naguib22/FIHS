using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.AuthModels
{
    public class VerifyAccountModel
    {
        [EmailAddress, StringLength(128)]
        public string Email { get; set; }
        [StringLength(6, MinimumLength = 6, ErrorMessage = "The code must be 6 digits")]
        public string VerificationCode { get; set; }
    }
}
