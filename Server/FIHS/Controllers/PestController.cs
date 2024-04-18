using FIHS.Dtos.PestDto;
using FIHS.Interfaces.IPest;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PestController : ControllerBase
    {
        private readonly IPestService _pestService;

        public PestController(IPestService pestService)
        {
            _pestService = pestService;
        }
        [HttpGet("GetAllPests")]
        public async Task<IActionResult> GetAllPestsAsync()
        {
            var pests=await _pestService.GetPestsAsync();
            return Ok(pests);
        }
        [HttpGet("GetPestById/{id}")]
        public async Task<IActionResult> GetPestByIdAsync(int id)
        {
            var pest = await _pestService.GetPestByIdAsync(id);
            if (!string.IsNullOrEmpty(pest.Message))
                return NotFound(pest.Message);
            return Ok(pest);
        }
        [HttpGet("GetPestByName/{name}")]
        public async Task<IActionResult> GetPestByNameAsync(string name)
        {
            var pest = await _pestService.GetPestByNameAsync(name);
            if(!string.IsNullOrEmpty(pest.Message))
                return NotFound(pest.Message);
            return Ok(pest);
        }
        [HttpGet("SearchForPestByName/{name}")]
        public async Task<IActionResult> SearchForPestByNameAsync(string name)
        {
            var pests = await _pestService.SearchForPestByNameAsync(name);
            return Ok(pests);
        }
        [HttpPost("AddPest")]
        public async Task<IActionResult> AddPestAsync([FromForm]PestDto pestDto)
        {
            var pest = await _pestService.AddPestAsync(pestDto);
            if(!string.IsNullOrEmpty(pest.Message))
                return BadRequest(pest.Message);
            return Ok(pest);
        }
        [HttpPut("UpdatePest/{id}")]
        public async Task<IActionResult> UpdatePestAsync([FromForm] UpdatePestDto updatePestDto,int id)
        {
            var pest = await _pestService.UpdatePestAsync(updatePestDto, id);
            if(!string.IsNullOrEmpty(pest.Message))
                return NotFound(pest.Message);
            return Ok(pest);
        }
        [HttpDelete("DeletePest/{id}")]
        public async Task<IActionResult> DeletePestAsync(int id)
        {
            var pest =await _pestService.DeletePestAsync(id);
            if(!string.IsNullOrEmpty(pest.Message))
                return NotFound(pest.Message);
            return Ok(pest);
        }

    }
}
