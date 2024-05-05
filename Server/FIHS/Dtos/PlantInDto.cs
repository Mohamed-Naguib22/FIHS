using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos
{
    public class PlantInDto
    {
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
        public string? ImageUrl { get; set; }
        public IFormFile? ImgFile { get; set; }
        public List<int> PlantTypesId { get; set; }
        public List<int> SoilsId { get; set; }
    }
}
