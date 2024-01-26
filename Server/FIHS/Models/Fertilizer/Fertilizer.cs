using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.Fertilizer
{
    public class Fertilizer
    {
        public int Id {  get; set; }
        [Required]
        public string Name { get; set; }
        public string? ImageURL { get; set; }
        public double price { get; set; }
        [MaxLength(500)]
        public string? UsageInstructions { get; set; }
        public string? Manufactuer { get; set; }
        public string? NutrientContent { get; set; }
    }
}
