using FIHS.Models.AuthModels;
using FIHS.Models.FavouriteModels;

namespace FIHS.Dtos.FavouriteDto
{
    public class GetAllFavPlantsDto
    {
        public DateTime CreatedAt { get; set; }
        public  IEnumerable<FavoritePlantDto> FavPlants { get; set; }
    }
}
