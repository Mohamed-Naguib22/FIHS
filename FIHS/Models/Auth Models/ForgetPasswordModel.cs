using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.Auth_Models
{
    public class ForgetPasswordModel
    {
        [EmailAddress, StringLength(128)]
        public string Email { get; set; }
    }
}
