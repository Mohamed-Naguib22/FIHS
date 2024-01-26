using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PesticideDto;
using FIHS.Interfaces.IFertilizer;
using FIHS.Interfaces.IPesticide;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FertilizerController : ControllerBase
    {
        private readonly IFertilizer _fertilizer;

        public FertilizerController(IFertilizer fertilizer)
        {
            _fertilizer = fertilizer;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFertilizerAsync()
        {
            var fertilizers = await _fertilizer.GetAllFertilizerAsync();
            return Ok(fertilizers);
        }

        [HttpGet("GetByName")]
        public async Task<IActionResult> GetFertilizerByNameAsync([FromQuery] string name)
        {
            var fertilizer = await _fertilizer.GetFertilizerByNameAsync(name);
            return Ok(fertilizer);
        }

        [HttpPost]
        public async Task<IActionResult> AddFertilizerAsync([FromForm] FertilizerDto fertilizerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ErrorCount);
            var fertilizer = await _fertilizer.AddFertilizerAsync(fertilizerDto);
            return Ok(fertilizer);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFertilizerAsync([FromForm] FertilizerDto fertilizerDto, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ErrorCount);
            var fertilizer = await _fertilizer.UpdateFertilizerAsync(fertilizerDto, id);
            return Ok(fertilizer);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFertilizerAsync(int id)
        {
            var fertilizer = await _fertilizer.GetFertilizerByIdAsync(id);
            var fertlizerDto= await _fertilizer.DeleteFertilizerAsync(fertilizer);
            return Ok(fertlizerDto);
        }
    }
}
