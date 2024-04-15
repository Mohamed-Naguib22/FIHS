using FIHS.Dtos;

namespace FIHS.Interfaces.IPlantType
{
    public interface IPlantType
    {
        public Task<IEnumerable<PlantTypeDto>> GetAllPlantTypesAsync();
        public Task<PlantTypeDto> GetPlantTypeByNameAsync(string plantTypeName);
    }
}
