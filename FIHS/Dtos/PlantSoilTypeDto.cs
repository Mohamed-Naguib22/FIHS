using FIHS.Models.Plant;
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    public class PlantSoilTypeDto
    {
        public int PlantId { get; set; }
        public Plant Plant { get; set; }
        public int SoilId { get; set; }
        public Soil Soil { get; set; }
    }
}
