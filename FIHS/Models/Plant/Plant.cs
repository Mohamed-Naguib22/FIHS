using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FIHS.Models.Plant
{
        [Index(nameof(Name),IsUnique = true)]
    public class Plant
    {
        public int Id { get; set; }
        [Required,MaxLength(50),MinLength(2)]
        public string Name { get; set; }
        [Required, MaxLength(50), MinLength(5)]
        public string Description { get; set; }
        [ MaxLength(128), MinLength(2)]
        public string? CommonUses { get; set; }
        [ MaxLength(128), MinLength(2)]
        public string? NutritionalValue { get; set; }
        [Range(0,double.MaxValue)]
        public double AverageYield { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string SunlightReqs { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public double IrrigationReqs { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string PlantingSeason { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string HarvistingSeason { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string CulivationTips{ get; set; }
        [ValidateNever]
        public string ImageUrl { get; set; }

        [NotMapped]
        public IFormFile ImgFile { get; set; }
        [ValidateNever, NotMapped]
        public ICollection<PlantsTypesOfPlant> PlantTypes { get; set; }
        [ValidateNever, NotMapped]
        public IEnumerable<Soil> Soils { get; set; }



    }
}
