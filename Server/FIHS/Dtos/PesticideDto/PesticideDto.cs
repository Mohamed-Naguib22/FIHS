using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.PesticideDto
{
    public class PesticideDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Manufactuer { get; set; }
        public string? UsageInstructions { get; set; }
        public string? Toxicity { get; set; }
        public string? Type { get; set; }
        public IFormFile? ImageURL { get; set; }

    }
}
