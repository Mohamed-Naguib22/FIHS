using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.FertilizerDto
{
    public class FertilizerReturnDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ImageURL { get; set; }
        public string? UsageInstructions { get; set; }
        public string? Manufactuer { get; set; }
    }
}
