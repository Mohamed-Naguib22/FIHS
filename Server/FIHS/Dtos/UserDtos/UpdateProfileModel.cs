using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.UserDtos
{
    [ValidateNever]
    public class UpdateProfileModel
    {
        [StringLength(50)]
        public string? FirstName { get; set; }
        [StringLength(50)]
        public string? LastName { get; set; }
        [Phone(ErrorMessage = "Invalid phone number"), StringLength(11, MinimumLength = 11)]
        public string? PhoneNumber { get; set; }
    }
}
