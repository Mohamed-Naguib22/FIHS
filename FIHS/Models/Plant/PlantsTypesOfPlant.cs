using System.Text.Json.Serialization;

namespace FIHS.Models.Plant
{
    public class PlantsTypesOfPlant
    {

        public int PlantId { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Plant Plant { get; set; }

        public int PlantTypeId { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public PlantType PlantType { get; set; }
    }
}
