using FIHS.Models.Fertilizer;
using FIHS.Models.PlantModels;

namespace FIHS.Models.FertilizerModels
{
    public class PlantFertilizer
    {
       public int PlantId { get; set; }
       public Plant  Plant { get; set; }
        public int FertilizerId { get; set; }
       public Fertilizer.Fertilizer  Fertilizer { get; set; }

    }
}
