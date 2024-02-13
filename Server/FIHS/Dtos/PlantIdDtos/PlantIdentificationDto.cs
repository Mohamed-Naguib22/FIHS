using FIHS.Models.PlantIdentification;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.IdentificationDtos
{
    public class PlantIdentificationDto
    {
        public string? Name { get; set; }
        public string? ScientificName { get; set; }
        public string? Description { get; set; }
        public string? WikiUrl { get; set; }
        public string? ImageUrl { get; set; }
        public Taxonomy? Taxonomy { get; set; }
        [ValidateNever, JsonIgnore]
        public string? Message { get; set; }
        [ValidateNever, JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
