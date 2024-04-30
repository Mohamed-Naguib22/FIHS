namespace FIHS.Models.PlantId
{
    public class MLDisease
    {
        public string Name { get; set; }
        public float Probability { get; set; }
        public DiseaseDetails Disease_details { get; set; }
    }
}
