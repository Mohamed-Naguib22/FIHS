using FIHS.Dtos.DiseaseDto;
using FIHS.Interfaces.IDisease;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiseaseController : ControllerBase
    {
        private readonly IDiseaseService _diseaseService;

        public DiseaseController(IDiseaseService diseaseService)
        {
            _diseaseService = diseaseService;
        }

        [HttpGet("GetAllDiseases")]
        public async Task<IActionResult> GetAllDiseasesAsync()
        {
            var diseases =await _diseaseService.GetDiseasesAsync();
            return Ok(diseases);
        }
        [HttpGet("GetDiseaseByName/{name}")]
        public async Task<IActionResult> GetDiseaseByNameAsync(string name)
        {
            var disease = await _diseaseService.GetDiseaseByNameAsync(name);
            if (!string.IsNullOrEmpty(disease.Message))
                return NotFound(disease.Message);
            return Ok(disease);
        }
        [HttpGet("SearchForDiseaseByName/{name}")]
        public async Task<IActionResult> SearchForDiseaseByNameAsync(string name)
        {
            var diseases = await _diseaseService.SearchForDiseaseByNameAsync(name); 
            return Ok(diseases);
        }
        [HttpPost("AddDisease")]
        public async Task<IActionResult> AddDiseaseAsync([FromForm] DiseaseDto diseaseDto)
        {
            var disease = await _diseaseService.AddDiseaseAsync(diseaseDto);
            if(!string.IsNullOrEmpty(disease.Message))
                return BadRequest(disease.Message);
            return Ok(disease);
        }
        [HttpPut("UpdateDisease/{id}")]
        public async Task<IActionResult> UpdateDiseaseAsync([FromForm] UpdateDiseaseDto diseaseDto,int id)
        {
            var disease=await _diseaseService.UpdateDiseaseAsync(diseaseDto,id);
            if(!string.IsNullOrEmpty(disease.Message))
                return NotFound(disease.Message);
            return Ok(disease);
        }
        [HttpDelete("DeleteDisease/{id}")]
        public async Task<IActionResult> DeleteDiseaseAsync(int id)
        {
            var disease = await _diseaseService.DeleteDiseaseAsync(id);
            if (!string.IsNullOrEmpty(disease.Message))
                return NotFound(disease.Message);
            return Ok(disease);
        }
    }
}
