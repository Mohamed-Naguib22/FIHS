using FIHS.Models.PlantIdentification;

namespace FIHS.Dtos.PlantIdDtos
{
    public class SuggestionDto
    {
        public List<string>? CommonNames { get; set; }
        public string? ScientificName { get; set; }
        public float Probability { get; set; }
        public bool Confirmed { get; set; }
        public string? Description { get; set; }
        public string? WikiUrl { get; set; }
        public string? ImageUrl { get; set; }
        public Taxonomy? Taxonomy { get; set; }
    }
}
