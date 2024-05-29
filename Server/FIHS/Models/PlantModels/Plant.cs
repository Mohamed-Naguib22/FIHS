using FIHS.Models.CommentModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.FavouriteModels;
using FIHS.Models.FertilizerModels;
using FIHS.Models.PestModels;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FIHS.Models.PlantModels
{
        [Index(nameof(Name),IsUnique = true)]
    public class Plant
    {
        //public Plant(string name, string scientificName, string description, string color, string? commonUses, string? nutritionalValue, double averageYield, string sunlightReqs, string irrigationReqs, string temperature, string plantingSeason, string harvistingSeason, string culivationTips, string imageUrl)
        //{
        //    Name = name;
        //    ScientificName = scientificName;
        //    Description = description;
        //    Color = color;
        //    CommonUses = commonUses;
        //    NutritionalValue = nutritionalValue;
        //    AverageYield = averageYield;
        //    SunlightReqs = sunlightReqs;
        //    IrrigationReqs = irrigationReqs;
        //    Temperature = temperature;
        //    PlantingSeason = plantingSeason;
        //    HarvistingSeason = harvistingSeason;
        //    CulivationTips = culivationTips;
        //    ImageUrl = imageUrl;
        //}

        [JsonIgnore]
        public int? Id { get; set; }
        [Required,MaxLength(50),MinLength(2)]
        public string Name { get; set; }
        [Required, MaxLength(50), MinLength(2)]
        public string ScientificName { get; set; }
        [Required, MaxLength(516), MinLength(5)]
        public string Description { get; set; }
        [Required, MaxLength(50),MinLength(2)]
        public string Color { get; set; }
        [ MaxLength(512), MinLength(2)]
        public string? CommonUses { get; set; }
        [ MaxLength(512), MinLength(2)]
        public string? NutritionalValue { get; set; }
        [Range(0,double.MaxValue)]
        public double AverageYield { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string SunlightReqs { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string IrrigationReqs { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string Temperature { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string PlantingSeason { get; set; }
        [Required, MaxLength(128), MinLength(2)]
        public string HarvistingSeason { get; set; }
        [Required, MaxLength(512), MinLength(2)]
        public string CulivationTips{ get; set; }
        [ValidateNever]
        public string ImageUrl { get; set; }

        [NotMapped]
        public IFormFile ImgFile { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<PlantsTypesOfPlant> PlantTypes { get; set; } = null;
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual IEnumerable<PlantSoilTypes> Soils { get; set; } = null;
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual IEnumerable<PlantsDiseases> Diseases { get; set; } = null;
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual IEnumerable<PlantsPests> Pests { get; set; }
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public virtual IEnumerable<FavouritePlant> FavouritePlants { get; set; } = null;
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public virtual ICollection<PlantFertilizer> PlantFertilizer { get; set; }
        [ValidateNever]
        public virtual ICollection<Comment> Comments { get; set; }



    }
}
