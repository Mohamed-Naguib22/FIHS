using FIHS.Models.PlantModels;
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    public class PlantsTypesOfPlantDto
    {
        public int PlantId { get; set; }
        public PlantDto Plant { get; set; }

        public int PlantTypeId { get; set; }
        public PlantTypeDto PlantType { get; set; }
    }
}
