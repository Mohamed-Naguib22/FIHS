using FIHS.Dtos.PesticideDto;
using FIHS.Models.Pesticide;

namespace FIHS.Interfaces.IPesticide
{
    public interface IPesticide
    {
        Task<Pesticide> GetByIdAsync(int id);
       Task<IEnumerable<PesticideReturnDto>> GetAllPesticideAsync();
        Task<IEnumerable<PesticideReturnDto>> GetPesticideByNameAsync(string name);
        Task<PesticideReturnDto> AddPesticideAsync(PesticideDto dto);
        Task<PesticideReturnDto> UpdateAsync(PesticideDto dto , int id);
        Task<PesticideReturnDto> DeleteAsync(Pesticide pesticide);
    }
}
