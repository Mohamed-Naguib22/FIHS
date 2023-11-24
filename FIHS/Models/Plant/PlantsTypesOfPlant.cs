namespace FIHS.Models.Plant
{
    public class PlantsTypesOfPlant
    {

        public int PlantId { get; set; }
        public Plant Plant { get; set; }

        public int PlantTypeId { get; set; }
        public PlantType PlantType { get; set; }
    }
}
