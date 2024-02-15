using FIHS.Dtos.DiseaseDto;
using FIHS.Models.Disease;


namespace FIHS.Interfaces.IDisease
{
    public interface IDiseaseService
    {
        Task<Disease> AddDiseaseAsync(DiseaseDto diseaseDto);
        Task<IEnumerable<Disease>> GetDiseasesAsync();
        Task<Disease> DeleteDiseaseAsync(int id);
        Task<Disease> GetDiseaseByNameAsync(string name);
        Task<Disease> UpdateDiseaseAsync(UpdateDiseaseDto diseaseDto, int id);
        Task<IEnumerable<Disease>> SearchForDiseaseByNameAsync(string name);
    }
}
