using Microsoft.AspNetCore.Mvc;
using FIHS.Interfaces.IPlantId;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantIdController : ControllerBase
    {
        private readonly List<string> _allowedExtensions = new() { ".jpg", ".png", ".jpeg" };
        private readonly IPlantIdService _plantIdService;
        public PlantIdController(IPlantIdService plantIdService)
        {
            _plantIdService = plantIdService;
        }

        [HttpPost("identify-plant")]
        public IActionResult Identify([FromForm] IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imageFile.FileName).ToLower()))
                return BadRequest("نوع الملف هذا غير مسموح به");

            var result = _plantIdService.Identify(imageFile);
            
            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPost("detect-disease")]
        public IActionResult DetectDisease([FromForm] IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imageFile.FileName).ToLower()))
                return BadRequest("نوع الملف هذا غير مسموح به");

            var result = _plantIdService.DetectDisease(imageFile);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            if (result.IsHealthy)
                return Ok("النبات غير مصاب بامراض");

            return Ok(result);
        }
    }
}
