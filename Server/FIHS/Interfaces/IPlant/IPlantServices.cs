using FHIS.Services;
using FIHS.Dtos;
using FIHS.Dtos.PlantTypeDtos;
using FIHS.Models.PlantModels;
using FIHS.Repositories;

namespace FIHS.Interfaces.IPlant
{
    public interface IPlantServices
    {
        public Task<IEnumerable<PlantDto>> GetAllPlantsAsync(GetAllPlantsParams patameters);
        public Task<PlantDto> GetPlantByIdAsync(int id,int favId);
        public Task<bool> AddPlant(PlantInDto plantInDto);
        public Task<bool> DeletePlantAsync(int plantId);
        public bool IsPlantExist(int plantId);
        public Task<IEnumerable<PlantTypeDto>> GetAllPlantsTypeAsync();
        public Task<IEnumerable<SoilDto>> GetAllSoils();
        public Task<string> UpdateImage(int plantId, IFormFile imgFile);
        Task AddPlantTyeAsync(AddPlantTypeDto plantTypeDto);
        Task<bool> DeletePlantTyeAsync(int id);
    }
}
