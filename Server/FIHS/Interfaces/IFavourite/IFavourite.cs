using FIHS.Dtos.Favourite;
using FIHS.Dtos.FavouriteDto;
using FIHS.Models.FavouriteModels;

namespace FIHS.Interfaces.IFavourite
{
    public interface IFavourite
    {
        public Task<IEnumerable<GetAllFavPlantsDto>> GetFavouritePlants(int favouriteId);
        public  Task<bool> AddPlantToFavourite(FavouriteItemAddRequest favourite);
        public Task<bool> DeleteFavouriteItem(int FavoriteId, int plantId);
        public Task<bool> IsFavouriteItemExist(FavouriteItemAddRequest favourite);
    }
}
