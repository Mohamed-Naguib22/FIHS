using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.PestDto
{
    public class ReturnPestDto
    {
        public int Id { get; set; }
        public string Species { get; set; }
        public string Name { get; set; }
        public string ScientificName { get; set; }
        public string ImageUrl { get; set; }
        public string DamageSymptoms { get; set; }
        public string ControlMethods { get; set; }
        public string Description { get; set; }
        public string LifeCycle { get; set; }
        public string GeographicDistribution { get; set; }
        public string Reproduction { get; set; }
        public ICollection<PlantInDto> Plants { get; set; } 
        [JsonIgnore]
        public string Message { get; set; }
    }
}
