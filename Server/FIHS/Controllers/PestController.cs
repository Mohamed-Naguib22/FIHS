using FIHS.Dtos.PestDto;
using FIHS.Interfaces.IPest;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAllPests(int offset = 1, int limit = 10)
        {
            var pests= _pestService.GetPests(offset,limit);
            return Ok(pests);
        }
        [HttpGet("GetPestById/{id}")]
        public async Task<IActionResult> GetPestByIdAsync(int id)
        {
            var pest = await _pestService.GetPestByIdAsync(id);
            return string.IsNullOrEmpty(pest.Message)? Ok(pest) : NotFound(pest.Message);
        }
       
        [HttpGet("SearchForPestByName/{name}")]
        public IActionResult SearchForPestByName(string name,int offset = 1, int limit = 10)
        {
            var pests = _pestService.SearchForPestByName(name,offset,limit);
            return Ok(pests);
        }
        [HttpPost("AddPest")]
        public async Task<IActionResult> AddPestAsync([FromForm]PestDto pestDto)
        {
            var pest = await _pestService.AddPestAsync(pestDto);
            return Ok(pest);
        }
        [HttpPut("UpdatePest/{id}")]
        public async Task<IActionResult> UpdatePestAsync([FromForm] UpdatePestDto pestDto,int id)
        {
            var pest = await _pestService.UpdatePestAsync(pestDto, id);
            return string.IsNullOrEmpty(pest.Message) ? Ok(pest) : NotFound(pest.Message);
        }
        [HttpDelete("DeletePest/{id}")]
        public async Task<IActionResult> DeletePestAsync(int id)
        {
            var pest =await _pestService.DeletePestAsync(id);
            return string.IsNullOrEmpty(pest.Message) ? Ok(pest) : NotFound(pest.Message);
        }

    }
}
