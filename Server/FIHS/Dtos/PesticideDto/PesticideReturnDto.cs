using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.PesticideDto
{
    public class PesticideReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string? Description { get; set; }
        public string? Manufactuer { get; set; }
        public string? UsageInstructions { get; set; }
        public string? Toxicity { get; set; }
        public string? Type { get; set; }
        public string? ImageURL { get; set; }

    }
}
