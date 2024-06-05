using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces.IFavourite;
using FIHS.Interfaces;
using FIHS.Interfaces.IPlant;
using FIHS.Interfaces.IPlantId;
using FIHS.Models.PlantModels;
using System.Numerics;
using FIHS.Extensions;
using Microsoft.AspNetCore.Mvc;
using FIHS.Dtos.PlantTypeDtos;

namespace FIHS.Services.PlantservicesImp
{
    public class PlantServices : IPlantServices
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IFavourite _favourite;
        private readonly IPlantRepository _plantRepository;
        public PlantServices(IImageService imageService, IMapper mapper, IFavourite favourite, IPlantRepository plantRepository)
        {
            _imageService = imageService;
            _mapper = mapper;
            _favourite = favourite;
            _plantRepository = plantRepository;
        }
        public async Task<bool> AddPlant( PlantInDto plantInDto)
        {
            var plant = _mapper.Map<Plant>(plantInDto);
            if (_plantRepository.IsPlantNameExist(plant))
                return false;
            SetPlantSoils(plant, plantInDto);
            SetPlantTypes(plant, plantInDto);
            SetPlantImg(plant, plantInDto);
            return await _plantRepository.AddPlant(plant);
        }
        public async Task<IEnumerable<PlantDto>> SearchPlantByName(string searchtext)
        {
            var plantsDto = _mapper.Map<IEnumerable<PlantDto>>(await _plantRepository.SearchPlants(searchtext));
            return plantsDto;
        }

        public async Task<bool> DeletePlantAsync(int plantId)
        {
            var plantToDelete = await _plantRepository.GetPlantByIdAsync(plantId);
            if (plantToDelete is null) 
                return false;
            await _plantRepository.DeletePlantAsync(plantToDelete);
            return true;

        }

        public async Task<IEnumerable<PlantDto>> GetAllPlantsAsync(GetAllPlantsParams patameters)
        {
            var plants = await _plantRepository.GetAllPlantsAsync(patameters.plantTypeId, patameters.offset, patameters.limit);
            var plantsDto = _mapper.Map<List<PlantDto>>(plants).MarkFavPlants(await _favourite.GetFavouritePlants(patameters.FavId));
            return plantsDto ;
        }

        public async Task<IEnumerable<PlantTypeDto>> GetAllPlantsTypeAsync()
        {
           return _mapper.Map<IEnumerable<PlantTypeDto>>(await _plantRepository.GetAllPlantsTypeAsync());
        }

        public async Task<IEnumerable<SoilDto>> GetAllSoils()
        {
            return  _mapper.Map<IEnumerable<SoilDto>>(await _plantRepository.GetAllSoils());
        }

        public async Task<PlantDto> GetPlantByIdAsync(int id ,int favId =0)
        {
            if (!_plantRepository.IsPlantExist(id))
                return (new PlantDto("لا يوجد نبات بهذا الرقم"));
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByIdAsync(id));
            plantDto.IsFav = await _favourite.IsFavouriteItemExist(new Dtos.Favourite.FavouriteItemAddRequest() { FavouriteId = favId, PlantId = id });
            return plantDto;
        }
        public async Task<string> UpdateImage(int plantId, IFormFile imgFile)
        {
            var plant = await _plantRepository.GetPlantByIdAsync(plantId);
            if (plant == null) return string.Empty;
            plant.ImageUrl = _imageService.SetImage(imgFile, plant.ImageUrl);
            await _plantRepository.SaveChangesAsync();
            return plant.ImageUrl;
        }

        public async Task AddPlantTyeAsync(AddPlantTypeDto plantTypeDto)
        {
            var plantType = _mapper.Map<PlantType>(plantTypeDto);
            plantType.ImgURL = _imageService.SetImage(plantTypeDto.Image);
            
            await _plantRepository.AddPlantTyeAsync(plantType);
        }

        public async Task<bool> DeletePlantTyeAsync(int id)
        {
            var plantType = await _plantRepository.GetPlantTyeByIdAsync(id);

            if (plantType == null) 
                return false;

            await _plantRepository.DeletePlantTyeAsync(plantType);
            return true;
        }

        public bool IsPlantExist(int plantId)
        {
            throw new NotImplementedException();
        }

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
