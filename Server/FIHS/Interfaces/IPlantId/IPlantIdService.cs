using FIHS.Dtos.IdentificationDtos;
using FIHS.Dtos.PlantIdDtos;

namespace FIHS.Interfaces.IPlantId
{
    public interface IPlantIdService
    {
        Task<PlantIdentificationDto> Identify(IFormFile imageFile);
        Task<HealthAssessmentDto> DetectDisease(IFormFile imageFile);
    }
}
