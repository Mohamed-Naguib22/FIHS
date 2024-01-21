using FIHS.Models.Auth_Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    [ValidateNever]
    public class UpdateProfileModel
    {
        [StringLength(50)]
        public string? FirstName { get; set; }
        [StringLength(50)]
        public string? LastName { get; set; }
        [StringLength(128)]
        public string? Username { get; set; }
        [Phone(ErrorMessage = "Invalid phone number"), StringLength(11, MinimumLength = 11)]
        public string? PhoneNumber { get; set; }
    }
}
