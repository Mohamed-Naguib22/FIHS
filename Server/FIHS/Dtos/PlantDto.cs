using FIHS.Dtos.DiseaseDto;
using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PestDto;
using FIHS.Models.PlantModels;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    public class PlantDto
    {
        public PlantDto() { }
        public PlantDto(string message)
        {
            Message = message;
        }
            public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ScientificName { get; set; }
        public string? CommonUses { get; set; }
        public string Color { get; set; }
        public string? NutritionalValue { get; set; }
        public double AverageYield { get; set; }
        public string SunlightReqs { get; set; }
        public string IrrigationReqs { get; set; }
        public string Temperature { get; set; }
        public string PlantingSeason { get; set; }
        public string HarvistingSeason { get; set; }
        public string CulivationTips { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFav { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
            public string Message { get; set; } = string.Empty;
            public ICollection<PlantTypeDto> PlantTypes { get; set; }
            public ICollection<SoilDto> Soils { get; set; }
            public ICollection<ReturnDiseaseDto> Diseases { get; set; }
            public ICollection<ReturnPestDto> Pests { get; set; }
            public ICollection<FertilizerPlantDto> PlantFertilizer { get; set; }

    }
}
