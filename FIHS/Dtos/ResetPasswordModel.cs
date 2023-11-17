using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos
{
    public class ResetPasswordModel
    {
        [StringLength(128)]
        public string CurrentPassword { get; set; }
        [StringLength(128)]
        public string NewPassword { get; set; }
    }
}