using FIHS.Interfaces.IPlantType;
using FIHS.Models.PlantModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantTypeController : ControllerBase
    {
        private readonly IPlantType _plantType;

        public PlantTypeController(IPlantType plantType)
        {
            _plantType = plantType;
        }
        [HttpGet("GetAllPlantTypes")]
        public async Task<IActionResult> GetAllPlantTypes(int offset = 1, int limit = 10)
        {
            var plantTypes = await _plantType.GetAllPlantTypesAsync(offset, limit);
            return Ok(new { PlantTypes = plantTypes.Take(limit).ToList(),NextPage = limit < plantTypes.Count() ? offset + 1 : 0 });
        }
        [HttpGet("GetPlantTypeByName/{PlantTypeName}")]
        public async Task<IActionResult> GetPlantTypeByName(string PlantTypeName)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var plantType = await _plantType.GetPlantTypeByNameAsync(PlantTypeName);
            return plantType != null ? Ok(plantType) : BadRequest("لا يوجد نوع نبات بهذا الاسم");
        }
    }
}
