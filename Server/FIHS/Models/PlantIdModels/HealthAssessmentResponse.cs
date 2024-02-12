using FIHS.Models.PlantId;

namespace FIHS.Models.PlantIdentification
{
    public class HealthAssessmentResponse
    {
        public HealthAssessment Health_assessment { get; set; }
        public bool Is_plant { get; set; }
    }
}
