using FIHS.Dtos.PestDto;
using FIHS.Models.Pest;

namespace FIHS.Interfaces.IPest
{
    public interface IPestService
    {
        Task<Pest> AddPestAsync(PestDto pestDto);
        Task<IEnumerable<Pest>> GetPestsAsync();
        Task<Pest> DeletePestAsync(int id);
        Task<Pest> GetPestByNameAsync(string name);
        Task<Pest> UpdatePestAsync(UpdatePestDto pestDto,int id);
        Task<IEnumerable<Pest>> SearchForPestByNameAsync(string name);
    }
}
