using FIHS.Models.PlantId;

namespace FIHS.Dtos.PlantIdDtos
{
    public class DiseaseSuggestion
    {
        public string? Name { get; set; }
        public float Probability { get; set; }
        public string? ScientificName { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
        public MLTreatment? Treatment { get; set; }
        public List<string>? Classification { get; set; }
    }
}
