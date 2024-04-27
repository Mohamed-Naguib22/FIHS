using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Interfaces.IPlant;
using FIHS.Models.PlantModels;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PlantservicesImp
{
    public class PlantRepository : IPlantRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        public PlantRepository(ApplicationDbContext context, IImageService imageService,IMapper mapper)
        { 
            _context = context;
            _imageService = imageService;
            _mapper = mapper;

        }

        public async Task AddPlant(Plant plant, PlantInDto plantInDto)
        {
            SetPlantSoils(plant, plantInDto);
            SetPlantTypes(plant, plantInDto);
            SetPlantImg(plant, plantInDto);
            await _context.AddAsync(plant);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<Plant>> GetAllPlantsAsync(int offset=1 , int limit=10)
        {
            var plant = await _context.Plants.Skip((offset - 1) * limit).Take(offset * limit+1)
                //.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType)
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
            var plant = await _context.Plants.Include(pt => pt.PlantTypes).ThenInclude(p => p.PlantType).Include(p => p.Soils).ThenInclude(ps => ps.Soil).FirstOrDefaultAsync(p=>p.Name == name);
            return plant;
        }
        public async Task<PlantDto> DeletePlantAsync(int plantId)
        {
           var plantToDelete = await _context.Plants.FirstOrDefaultAsync(plant => plant.Id == plantId);
           PlantDto plantDto = _mapper.Map<PlantDto>(plantToDelete);
           if (plantToDelete is null)
            {
                plantDto.Message = "لم يتم ايجاد نبات بهذا الرقم";
                return plantDto;
            }
            _context.Plants.Remove(plantToDelete);
            _context.SaveChanges();
            return plantDto;
        }
        public async Task<IEnumerable<PlantTypeDto>> GetAllPlantsTypeAsync() =>
             _mapper.Map<IEnumerable<PlantTypeDto>>(await _context.PlantTypes.ToListAsync());

        public async Task<IEnumerable<SoilDto>> GetAllSoils()=>
            _mapper.Map<IEnumerable<SoilDto>>(await _context.Soils.ToListAsync());

        #region private methods
        private void SetPlantSoils(Plant plant, PlantInDto plantInDto)
        {
            plant.Soils = plantInDto.SoilsId.Select(soilIds => new PlantSoilTypes { SoilId = soilIds }).ToList();

        }
        private void SetPlantTypes(Plant plant, PlantInDto plantInDto)
        {
            plant.PlantTypes = plantInDto.PlantTypesId.Select(PTId => new PlantsTypesOfPlant { PlantTypeId = PTId }).ToList();
        }
        private void SetPlantImg(Plant plant, PlantInDto plantInDto)
        {
            plant.ImageUrl = _imageService.SetImage(plantInDto.ImgFile, plantInDto.ImageUrl);
        }


        #endregion


    }
}
