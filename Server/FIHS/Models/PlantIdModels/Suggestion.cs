namespace FIHS.Models.PlantIdentification
{
    public class Suggestion
    {
        public string Plant_name { get; set; }
        public float Probability { get; set; }
        public Plant_details Plant_details { get; set; }
    }
}
