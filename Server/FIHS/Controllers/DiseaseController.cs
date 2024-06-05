using FIHS.Dtos;
using FIHS.Dtos.DiseaseDto;
using FIHS.Interfaces.IDisease;
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
        public IActionResult GetAllDiseases(int offset = 1, int limit = 10)
        {
            var diseases = _diseaseService.GetDiseases(offset,limit);
            return Ok(diseases);
        }
        [HttpGet("GetDiseaseById/{id}")]
        public async Task<IActionResult> GetDiseaseByIdAsync(int id)
        {
            var disease = await _diseaseService.GetDiseaseByIdAsync(id);
            return string.IsNullOrEmpty(disease.Message) ? Ok(disease) : NotFound(disease.Message);
        }
      
        [HttpGet("SearchForDiseaseByName/{name}")]
        public IActionResult SearchForDiseaseByName(string name, int offset = 1, int limit = 10)
        {
            var diseases = _diseaseService.SearchForDiseaseByName(name,offset,limit); 
            return Ok(diseases);
        }
        [HttpPost("AddDisease")]
        public async Task<IActionResult> AddDiseaseAsync([FromForm] DiseaseDto diseaseDto)
        {
            var disease = await _diseaseService.AddDiseaseAsync(diseaseDto);
            return Ok(disease);
        }
        [HttpPut("UpdateDisease/{id}")]
        public async Task<IActionResult> UpdateDiseaseAsync([FromForm] UpdateDiseaseDto diseaseDto,int id)
        {
            var disease=await _diseaseService.UpdateDiseaseAsync(diseaseDto,id);
            return string.IsNullOrEmpty(disease.Message) ? Ok(disease) : NotFound(disease.Message);
        }
        [HttpDelete("DeleteDisease/{id}")]
        public async Task<IActionResult> DeleteDiseaseAsync(int id)
        {
            var disease = await _diseaseService.DeleteDiseaseAsync(id);
            return string.IsNullOrEmpty(disease.Message) ? Ok(disease) : NotFound(disease.Message);
        }
    }
}
