using FIHS.Models.PlantId;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.PlantIdDtos
{
    public class HealthAssessmentDto
    {
        public bool IsHealthy { get; set; }
        public string? Name { get; set; }
        public string? ScientificName { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
        public MLTreatment? Treatment { get; set; }
        public List<string>? Classification { get; set; }
        [ValidateNever, JsonIgnore]
        public string? Message { get; set; }
        [ValidateNever, JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
