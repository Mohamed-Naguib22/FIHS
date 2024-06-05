using FIHS.Dtos.DiseaseDto;


namespace FIHS.Interfaces.IDisease
{
    public interface IDiseaseService
    {
        Task<ReturnDiseaseDto> AddDiseaseAsync(DiseaseDto diseaseDto);
        DiseasesResultDto GetDiseases(int offset, int limit);
        Task<ReturnDiseaseDto> DeleteDiseaseAsync(int id);
        Task<ReturnDiseaseDto> UpdateDiseaseAsync(UpdateDiseaseDto diseaseDto, int id);
        DiseasesResultDto SearchForDiseaseByName(string name, int offset, int limit);
        Task<ReturnDiseaseDto> GetDiseaseByIdAsync(int id);
        Task<bool> IsDiseaseExist(int diseaseId);
        Task<bool> AddImageAsync(int id, IFormFile img);
    }
}
