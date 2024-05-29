using FIHS.Dtos;
using FIHS.Models.PlantModels;

namespace FIHS.Interfaces.IPlant
{
    public interface IPlantRepository
    {
        public Task<IEnumerable<Plant>> GetAllPlantsAsync(int plantTypeId, int offset = 1, int limit = 10);
        public Task<Plant> GetPlantByIdAsync(int id);
        public Task<Plant> GetPlantByNameAsync(string name);
        public Task<bool> AddPlant(Plant plant);
        public Task DeletePlantAsync(Plant plant);
        public bool IsPlantExist(int plantId);
        public Task<IEnumerable<PlantType>> GetAllPlantsTypeAsync();
        public Task<IEnumerable<Soil>> GetAllSoils();
        public bool IsPlantNameExist(Plant plant);

    }
}
