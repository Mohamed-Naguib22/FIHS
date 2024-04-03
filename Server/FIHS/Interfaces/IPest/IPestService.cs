using FIHS.Dtos.PestDto;
using FIHS.Models.Pest;

namespace FIHS.Interfaces.IPest
{
    public interface IPestService
    {
        Task<ReturnPestDto> AddPestAsync(PestDto pestDto);
        Task<IEnumerable<ReturnPestDto>> GetPestsAsync();
        Task<ReturnPestDto> DeletePestAsync(int id);
        Task<ReturnPestDto> GetPestByNameAsync(string name);
        Task<ReturnPestDto> UpdatePestAsync(UpdatePestDto pestDto,int id);
        Task<IEnumerable<ReturnPestDto>> SearchForPestByNameAsync(string name);
        Task<ReturnPestDto> GetPestByIdAsync(int id);
    }
}
