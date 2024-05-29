using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Interfaces.IFavourite;
using FIHS.Interfaces.IPlant;
using FIHS.Models.PlantModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FIHS.Repositories
{
    public class PlantRepository : IPlantRepository
    {
        private readonly ApplicationDbContext _context;
        public PlantRepository(ApplicationDbContext context, IImageService imageService, IMapper mapper, IFavourite favourite)
        {
            _context = context;

        }

        public async Task<bool> AddPlant(Plant plant)
        {
            await _context.AddAsync(plant);
            _context.SaveChanges();
            return true;
        }

        public async Task<IEnumerable<Plant>> GetAllPlantsAsync(int plantTypeId, int offset = 1, int limit = 10)
        {
            var plant = await _context.Plants.Skip((offset - 1) * limit).Take(offset * limit + 1)
                .Include(p => p.PlantFertilizer).ThenInclude(pf => pf.Fertilizer)
                .Include(pt => pt.PlantTypes.Where(pt => pt.PlantTypeId == plantTypeId)).ThenInclude(p => p.PlantType).Where(p => p.PlantTypes.Any(pt => pt.PlantTypeId == plantTypeId))
                //.Include(p => p.Soils).ThenInclude(ps => ps.Soil)
                //.Include(p => p.Diseases).ThenInclude(pd => pd.Disease)
                //.Include(p => p.Pests).ThenInclude(pp => pp.Pest)
                .ToListAsync();
            return plant;
        }

        public async Task<Plant> GetPlantByIdAsync(int id)
        {
            var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).Where(p => p.Id == id).FirstOrDefaultAsync();
            return plant;
        }

        async Task<Plant> IPlantRepository.GetPlantByNameAsync(string name)
        {
            var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).FirstOrDefaultAsync(p => p.Name == name);
            return plant;
        }
        public async Task DeletePlantAsync(Plant plant)
        {
            _context.Plants.Remove(plant);
            _context.SaveChanges();
        }
        public async Task<IEnumerable<PlantType>> GetAllPlantsTypeAsync() =>
             await _context.PlantTypes.ToListAsync();

        public async Task<IEnumerable<Soil>> GetAllSoils() =>
            await _context.Soils.ToListAsync();

        public bool IsPlantExist(int plantId) =>
            _context.Plants.Any(p => p.Id == plantId);
        public bool IsPlantNameExist(Plant plant)
        {
            var result = _context.Plants.Any(p => p.Name == plant.Name);
            return result;
        }




    }
}
