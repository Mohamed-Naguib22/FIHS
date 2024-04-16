using FIHS.Models.DiseaseModels;
using FIHS.Models.PlantModels;


namespace FIHS.Models
{
    public class PlantsDiseases
    {
        public int PlantId { get; set; }
        public Plant Plant { get; set; }
        public int DiseaseId { get; set; }
        public Disease Disease { get; set; }

    }
}
