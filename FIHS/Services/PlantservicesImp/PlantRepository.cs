using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Interfaces.IPlant;
using FIHS.Models.Plant;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PlantservicesImp
{
    public class PlantRepository : IPlantRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;
        public PlantRepository(ApplicationDbContext context, IImageService imageService)
        { 
            _context = context;
            _imageService = imageService;
        }

        public async Task AddPlant(Plant plant, PlantInDto plantInDto)
        {
            SetPlantSoils(plant, plantInDto);
            SetPlantTypes(plant, plantInDto);
            SetPlantImg(plant, plantInDto);
            await _context.AddAsync(plant);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<Plant>> GetAllPlantsAsync()
        {
            var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).ToListAsync();
            return plant;
        }

        public async Task<Plant> GetPlantByIdAsync(int id)
        {
           var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).Where(p => p.Id == id).FirstOrDefaultAsync();
            return plant;
        }

        async Task<Plant> IPlantRepository.GetPlantByNameAsync(string name)
        {
            var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).FirstOrDefaultAsync(p=>p.Name == name);
            return plant;
        }
        private async Task SetPlantSoils(Plant plant, PlantInDto plantInDto)
        {
            plant.Soils = plantInDto.SoilsId.Select(soilIds => new PlantSoilTypes { SoilId = soilIds }).ToList();

        }
        private async Task SetPlantTypes(Plant plant, PlantInDto plantInDto)
        {
            plant.PlantTypes = plantInDto.PlantTypesId.Select(PTId => new PlantsTypesOfPlant { PlantTypeId = PTId }).ToList();
        }
        private async Task SetPlantImg(Plant plant, PlantInDto plantInDto)
        {
            plant.ImageUrl = _imageService.SetImage(plantInDto.ImageUrl, plantInDto.ImgFile);
        }
    }
}
