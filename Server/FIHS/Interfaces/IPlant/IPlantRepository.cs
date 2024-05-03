using FIHS.Dtos;
using FIHS.Models.PlantModels;

namespace FIHS.Interfaces.IPlant
{
    public interface IPlantRepository
    {
        public Task<IEnumerable<Plant>> GetAllPlantsAsync(int plantTypeId, int offset = 1, int limit = 10);
        public Task<Plant> GetPlantByIdAsync(int id);
        public Task<Plant> GetPlantByNameAsync(string name);
        public Task AddPlant(Plant plant,PlantInDto plantInDto);
        public Task<PlantDto> DeletePlantAsync(int plantId);
        public bool IsPlantExist(int plantId);
        public Task<IEnumerable<PlantTypeDto>> GetAllPlantsTypeAsync();
        public Task<IEnumerable<SoilDto>> GetAllSoils();

    }
}
