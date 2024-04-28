using FIHS.Dtos.Favourite;
using FIHS.Dtos.FavouriteDto;
using FIHS.Models.FavouriteModels;

namespace FIHS.Interfaces.IFavourite
{
    public interface IFavourite
    {
        public Task<IEnumerable<GetAllFavPlantsDto>> GetFavouritePlants(string userId);
        public  Task<bool> AddPlantToFavourite(FavouriteItemAddRequest favourite);
        public Task<bool> IsFavouriteItemExist(FavouriteItemAddRequest favourite);
    }
}
