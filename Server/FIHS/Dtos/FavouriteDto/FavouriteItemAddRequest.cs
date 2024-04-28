using FIHS.Models.PlantModels;

namespace FIHS.Dtos.Favourite
{
    public class FavouriteItemAddRequest
    {
        public int PlantId { get; set; }
        public int FavouriteId { get; set; }
    }
}
