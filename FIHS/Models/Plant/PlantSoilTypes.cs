namespace FIHS.Models.Plant
{
    public class PlantSoilTypes
    {
        public int PlantId { get; set; }
        public Plant Plant { get; set; }
        public int SoilId { get; set; }
        public Soil Soil { get; set; }
    }
}
