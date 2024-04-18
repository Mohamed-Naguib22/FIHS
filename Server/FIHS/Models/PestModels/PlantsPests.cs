

using FIHS.Models.PlantModels;

namespace FIHS.Models.PestModels
{
    public class PlantsPests
    {
        public int PlantId { get; set; }
        public Plant Plant { get; set; }
        public int PestId { get; set; }
        public Pest Pest { get; set; }

    }
}
