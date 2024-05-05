using Microsoft.AspNetCore.Mvc;
using FIHS.Interfaces.IPlantId;
using FIHS.Dtos;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> IdentifyPlantAsync([FromForm] ImageDto imgDto)
        {
            if (imgDto.ImgFile == null || imgDto.ImgFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imgDto.ImgFile.FileName).ToLower()))
                return BadRequest("نوع الملف هذا غير مسموح به");

            var result = await _plantIdService.IdentifyPlantAsync(imgDto.ImgFile);

            return result.Succeeded ? Ok(result) : BadRequest(result.Message);
        }

        [HttpPost("detect-disease")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DetectDisease([FromForm] ImageDto imgDto)
        {
            if (imgDto.ImgFile == null || imgDto.ImgFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imgDto.ImgFile.FileName).ToLower()))
                return BadRequest("نوع الملف هذا غير مسموح به");

            var result = await _plantIdService.DetectDiseaseAsync(imgDto.ImgFile);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            if (result.IsHealthy)
                return Ok(new { result.IsHealthy });

            return Ok(result);
        }
    }
}
