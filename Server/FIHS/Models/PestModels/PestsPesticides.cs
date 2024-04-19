
using FIHS.Models.PesticideModels;

namespace FIHS.Models.PestModels
{
    public class PestsPesticides
    {
        public int PestId { get; set; }
        public Pest Pest { get; set; }
        public int PesticideId { get; set; }
        public Pesticide Pesticide { get; set; }
    }
}
