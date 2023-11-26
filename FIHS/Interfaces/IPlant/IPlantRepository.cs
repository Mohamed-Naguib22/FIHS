using FIHS.Dtos;
using FIHS.Models.Plant;

namespace FIHS.Interfaces.IPlant
{
    public interface IPlantRepository
    {
        public Task<IEnumerable<Plant>> GetAllPlantsAsync();
        public Task<Plant> GetPlantByIdAsync(int id);
        public Task<Plant> GetPlantByNameAsync(string name);
        public Task AddPlant(Plant plant,PlantInDto plantInDto);
    }
}
