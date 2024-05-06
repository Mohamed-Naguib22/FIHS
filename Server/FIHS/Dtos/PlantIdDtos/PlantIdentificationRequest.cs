namespace FIHS.Dtos.PlantIdDtos
{
    public class PlantIdentificationRequest
    {
        public List<string> plant_details { get; set; }
        public string plant_language { get; set; }
        public List<string> images { get; set; }

        public PlantIdentificationRequest(string image)
        {
            plant_details = new List<string>() { "common_names", "url", "wiki_description", "taxonomy", "wiki_image" };
            plant_language = "ar";
            images = new List<string>() { image };
        }
    }
}
