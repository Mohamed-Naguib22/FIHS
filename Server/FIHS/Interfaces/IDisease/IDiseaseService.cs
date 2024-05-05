using FIHS.Dtos.DiseaseDto;
using FIHS.Models.DiseaseModels;


namespace FIHS.Interfaces.IDisease
{
    public interface IDiseaseService
    {
        Task<ReturnDiseaseDto> AddDiseaseAsync(DiseaseDto diseaseDto);
        Task<IEnumerable<ReturnDiseaseDto>> GetDiseasesAsync();
        Task<ReturnDiseaseDto> DeleteDiseaseAsync(int id);
        Task<ReturnDiseaseDto> GetDiseaseByNameAsync(string name);
        Task<ReturnDiseaseDto> UpdateDiseaseAsync(UpdateDiseaseDto diseaseDto, int id);
        Task<IEnumerable<ReturnDiseaseDto>> SearchForDiseaseByNameAsync(string name);
        Task<ReturnDiseaseDto> GetDiseaseByIdAsync(int id);
        Task<bool> IsDiseaseExist(int diseaseId);
    }
}
