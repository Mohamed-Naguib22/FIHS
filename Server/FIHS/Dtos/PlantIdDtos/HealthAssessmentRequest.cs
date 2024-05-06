using FIHS.Models.PlantId;
using Google.Cloud.Translation.V2;

namespace FIHS.Dtos.PlantIdDtos
{
    public class HealthAssessmentRequest
    {
        public List<string> disease_details { get; set; }
        public string language { get; set; }
        public List<string> images { get; set; }

        public HealthAssessmentRequest(string image)
        {
            disease_details = new List<string>() { "description", "url", "treatment", "common_names", "classification" };
            language = "ar";
            images = new List<string>() { image };
        }
    }
}
