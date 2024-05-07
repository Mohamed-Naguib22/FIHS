using FIHS.Models.FertilizerModels;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.Fertilizer
{
    public class Fertilizer
    {
        public int Id {  get; set; }
        [Required]
        public string Name { get; set; }
        public string? ImageURL { get; set; }
        public string Description { get; set; }
        [MaxLength(500)]
        public string? UsageInstructions { get; set; }
        public string? Manufactuer { get; set; }

        [ValidateNever]
        public IEnumerable<PlantFertilizer> PlantFertilizer { get; set; }
    }
}
