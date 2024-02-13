using FIHS.Dtos.IdentificationDtos;
using FIHS.Dtos.PlantIdDtos;

namespace FIHS.Interfaces.IPlantId
{
    public interface IPlantIdService
    {
        PlantIdentificationDto Identify(IFormFile imageFile);
        HealthAssessmentDto DetectDisease(IFormFile imageFile);
    }
}
