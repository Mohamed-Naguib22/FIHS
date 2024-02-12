namespace FIHS.Models.PlantId
{
    public class DiseaseDetails
    {
        public string Url { get; set; }
        public string Description { get; set; }
        public string Local_name { get; set; }
        public MLTreatment Treatment { get; set; }
        public List<string>? Classification { get; set; }
    }
}
