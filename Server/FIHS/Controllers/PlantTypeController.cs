using FIHS.Interfaces.IPlantType;
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
        public async Task<IActionResult> GetAllPlantTypes()
        {
            
            return Ok(await _plantType.GetAllPlantTypesAsync());
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
