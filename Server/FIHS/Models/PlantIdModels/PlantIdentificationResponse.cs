namespace FIHS.Models.PlantIdentification
{
    public class PlantIdentificationResponse
    {
        public List<Suggestion> Suggestions { get; set; }
        public bool Is_plant { get; set; }
    }
}
