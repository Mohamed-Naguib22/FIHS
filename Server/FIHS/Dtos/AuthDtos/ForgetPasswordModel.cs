using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.AuthModels
{
    public class ForgetPasswordModel
    {
        [EmailAddress, StringLength(128)]
        public string Email { get; set; }
    }
}
