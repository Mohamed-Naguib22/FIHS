using FIHS.Dtos.PesticideDto;
using FIHS.Interfaces.IPesticide;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PesticideController : ControllerBase
    {
        private readonly IPesticide _pesticide;

        public PesticideController(IPesticide pesticide)
        {
            _pesticide = pesticide;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPesticideAsync()
        {
            var pesticide = await _pesticide.GetAllPesticideAsync();
            return Ok(pesticide);
        }

        [HttpGet("GetByName")]
        public async Task<IActionResult> GetPesticideByNameAsync([FromQuery] string name)
        {
            var pesticide = await _pesticide.GetPesticideByNameAsync(name);
            return Ok(pesticide);
        }

        [HttpPost]
        public async Task<IActionResult> AddPesticideAsync([FromForm] PesticideDto pesticideDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ErrorCount);
            var pesticide = await _pesticide.AddPesticideAsync(pesticideDto);
            return Ok(pesticide);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePesticideAsync([FromForm] PesticideDto pesticideDto, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ErrorCount);
            var pesticide = await _pesticide.UpdateAsync(pesticideDto, id);
            return Ok(pesticide);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePesticideAsync(int id)
        {
            var pesticide = await _pesticide.GetByIdAsync(id);
           var pesticide1 = await _pesticide.DeleteAsync(pesticide);
            return Ok(pesticide1);
        }
    }
}
