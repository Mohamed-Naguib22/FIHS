using FIHS.Models.Plant;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos
{
    public class PlantDto
    {
        PlantDto() { }
        PlantDto(string message)
        {
            Message = message;
        }
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string? CommonUses { get; set; }
            public string? NutritionalValue { get; set; }
            public double AverageYield { get; set; }
            public string SunlightReqs { get; set; }
            public double IrrigationReqs { get; set; }
            public string PlantingSeason { get; set; }
            public string HarvistingSeason { get; set; }
            public string CulivationTips { get; set; }
            public string ImageUrl { get; set; }
        public string Message { get; set; } = string.Empty;
            public ICollection<PlantTypeDto> PlantTypes { get; set; }
            public ICollection<SoilDto> Soils { get; set; }

    }
}
