using FIHS.Dtos;
using FIHS.Dtos.FavouriteDto;
using FIHS.Interfaces.IFavourite;
using FIHS.Models.FavouriteModels;

namespace FIHS.Extensions
{
    public static class MarkFavExtension
    {

        public static List<PlantDto> MarkFavPlants( this List<PlantDto> plantDto, IEnumerable<GetAllFavPlantsDto> favorites)
        {
            foreach (var plant in plantDto)
            {
                plant.IsFav = favorites.Where(f=> f.FavPlants.Any(fp => fp.PlantId == plant.Id)).Any();
            }
            return plantDto;
        }
    }
}
