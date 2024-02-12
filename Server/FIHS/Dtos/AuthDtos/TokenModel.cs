using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Build.Framework;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.AuthModels
{
    public class TokenModel
    {
        [Required]
        public string? Token { get; set; }
        [JsonIgnore, ValidateNever]
        public string Message { get; set; }
    }
}
