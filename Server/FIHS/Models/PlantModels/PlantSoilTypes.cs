using System.Text.Json.Serialization;

namespace FIHS.Models.PlantModels
{
    public class PlantSoilTypes
    {
        public int PlantId { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Plant Plant { get; set; }
        public int SoilId { get; set; }
        [ JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Soil Soil { get; set; }
    }
}
