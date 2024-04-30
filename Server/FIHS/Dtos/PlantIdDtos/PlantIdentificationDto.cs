using FIHS.Dtos.PlantIdDtos;
using FIHS.Models.PlantIdentification;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.IdentificationDtos
{
    public class PlantIdentificationDto
    {
        public IEnumerable<SuggestionDto> Suggestions { get; set; }
        [ValidateNever, JsonIgnore]
        public string? Message { get; set; }
        [ValidateNever, JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
