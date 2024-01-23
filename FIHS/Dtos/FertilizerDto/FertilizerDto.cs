using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.FertilizerDto
{
    public class FertilizerDto
    {
        public string? Name { get; set; }
        public IFormFile? ImageURL { get; set; }
        public double? price { get; set; }
        public string? UsageInstructions { get; set; }
        public string? Manufactuer { get; set; }
        public string? NutrientContent { get; set; }
    }
}
