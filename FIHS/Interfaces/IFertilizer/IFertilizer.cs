using FIHS.Dtos.FertilizerDto;
using FIHS.Models.Fertilizer;
using FIHS.Models.Pesticide;

namespace FIHS.Interfaces.IFertilizer
{
    public interface IFertilizer
    {
        Task<Fertilizer> GetFertilizerByIdAsync(int id);
        Task<IEnumerable<FertilizerReturnDto>> GetAllFertilizerAsync();
        Task<IEnumerable<FertilizerReturnDto>> GetFertilizerByNameAsync(string name);
        Task<FertilizerReturnDto> AddFertilizerAsync(FertilizerDto dto);
        Task<FertilizerReturnDto> UpdateFertilizerAsync(FertilizerDto dto , int id);
        Task<FertilizerReturnDto> DeleteFertilizerAsync(Fertilizer fertilizer);
    }
}
