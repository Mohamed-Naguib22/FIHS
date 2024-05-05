using FIHS.Models.PlantModels;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.FavouriteModels
{
    public class FavouritePlant
    {
        public int PlantId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual Plant Plant { get; set; }
        public int FavouriteId { get; set; }
        public virtual Favourite Favourite { get; set; }
    }
}
