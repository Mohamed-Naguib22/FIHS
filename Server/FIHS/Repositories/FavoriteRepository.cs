using AutoMapper;
using FIHS.Dtos.Favourite;
using FIHS.Dtos.FavouriteDto;
using FIHS.Interfaces.IFavourite;
using FIHS.Models.AuthModels;
using FIHS.Models.FavouriteModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Repositories
{
    public class FavouriteRepository : IFavourite
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FavouriteRepository(IMapper mapper, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }
        public async Task<IEnumerable<GetAllFavPlantsDto>> GetFavouritePlants(int favouriteId)
        {
           if(!_context.Favourites.Any(f => f.Id == favouriteId))
                return Enumerable.Empty<GetAllFavPlantsDto>();
            var favPlants = await _context.Favourites.Where(f => f.Id == favouriteId).Include(f => f.FavPlants).ThenInclude(fp => fp.Plant).ToListAsync();
            var getAllFavPlantsDto = _mapper.Map<IEnumerable<GetAllFavPlantsDto>>(favPlants);
            return getAllFavPlantsDto;
        }


        public async Task<bool> AddPlantToFavourite(FavouriteItemAddRequest favourite)
        {
            var favouritePlant = _mapper.Map<FavouritePlant>(favourite);
            if (await IsFavouriteItemExist(favourite)) 
                return false;
            await _context.AddAsync(favouritePlant);
            _context.SaveChanges();
            return true;
        }
        public async Task<bool> IsFavouriteItemExist(FavouriteItemAddRequest favourite)
        {
            return  _context.FavouritePlants.Any(fp => fp.PlantId == favourite.PlantId && fp.FavouriteId == favourite.FavouriteId);
        }

        public async Task<bool> DeleteFavouriteItem(int FavoriteId , int plantId)
        {
            var favourotePlant = await _context.FavouritePlants.Where(fp => fp.FavouriteId == FavoriteId && fp.PlantId == plantId ).FirstOrDefaultAsync();
            if (favourotePlant == null)
                return false;
             _context.Remove(favourotePlant);
             _context.SaveChanges();
            return true;
        }
    }
}
