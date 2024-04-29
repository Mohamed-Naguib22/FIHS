using FIHS.Dtos;

namespace FIHS.Interfaces.IPlantType
{
    public interface IPlantType
    {
        public Task<IEnumerable<PlantTypeDto>> GetAllPlantTypesAsync(int offset = 1, int limit = 10);
        public Task<PlantTypeDto> GetPlantTypeByNameAsync(string plantTypeName);
    }
}
