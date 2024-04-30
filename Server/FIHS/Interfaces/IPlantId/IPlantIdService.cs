using FIHS.Dtos.IdentificationDtos;
using FIHS.Dtos.PlantIdDtos;

namespace FIHS.Interfaces.IPlantId
{
    public interface IPlantIdService
    {
        Task<PlantIdentificationDto> IdentifyPlantAsync(IFormFile imageFile);
        Task<HealthAssessmentDto> DetectDiseaseAsync(IFormFile imageFile);
    }
}
