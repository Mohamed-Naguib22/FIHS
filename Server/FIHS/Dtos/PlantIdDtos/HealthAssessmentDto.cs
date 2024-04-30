using FIHS.Models.PlantId;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.PlantIdDtos
{
    public class HealthAssessmentDto
    {
        public bool IsHealthy { get; set; }
        public bool IsPlant { get; set; }
        public IEnumerable<DiseaseSuggestion> Suggestions { get; set; }
        [ValidateNever, JsonIgnore]
        public string? Message { get; set; }
        [ValidateNever, JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
