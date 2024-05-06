using FIHS.Dtos.PestDto;
using FIHS.Models.PestModels;


namespace FIHS.Interfaces.IPest
{
    public interface IPestService
    {
        Task<ReturnPestDto> AddPestAsync(PestDto pestDto);
        PestsResultDto GetPests(int offset = 1, int limit = 10);
        Task<ReturnPestDto> DeletePestAsync(int id);
        Task<ReturnPestDto> UpdatePestAsync(UpdatePestDto pestDto,int id);
        PestsResultDto SearchForPestByName(string name, int offset = 1, int limit = 10);
        Task<ReturnPestDto> GetPestByIdAsync(int id);
        Task<bool> IsPestExist(int pestId);
    }
}
