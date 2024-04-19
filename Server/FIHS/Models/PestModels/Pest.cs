using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FIHS.Models.PestModels
{
    public class Pest
    {
        public int Id { get; set; }
        [MinLength(2),MaxLength(50)]
        public string Species { get; set; }
        [MinLength(2),MaxLength(50)]
        public string Name { get; set; }
        [MinLength(2),MaxLength(128)]
        public string ScientificName { get; set; }
        public string ImageUrl { get; set; }
        [MinLength(2), MaxLength(128)]
        public string DamageSymptoms { get; set; }
        [MinLength(2), MaxLength(128)]
        public string ControlMethods { get; set; }
        [MinLength(2), MaxLength(128)]
        public string Description { get; set; }
        [MinLength(2), MaxLength(128)]
        public string LifeCycle { get; set; }
        [MinLength(2), MaxLength(50)]
        public string GeographicDistribution { get; set; }
        [MinLength(2), MaxLength(128)]
        public string  Reproduction { get; set; }
        [JsonIgnore,ValidateNever,NotMapped]
        public string Message { get; set; }
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual IEnumerable<PlantsPests> Plants { get; set; }
        [ValidateNever]
        public virtual IEnumerable<PestsPesticides> Pesticides { get; set; }

    }
}
