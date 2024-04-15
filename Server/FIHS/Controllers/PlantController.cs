using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using FIHS.Models.Plant;
using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces.IPlant;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using FIHS.Interfaces;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPlantRepository _plantRepository;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        public PlantController(ApplicationDbContext context, IMapper mapper, IPlantRepository plantRepository, IImageService imageService)
        {

            _context = context;
            _mapper = mapper;
            _plantRepository = plantRepository;
            _imageService = imageService;
        }
        [HttpGet("GetAllPlants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllPlants()
        {
            var plantsDto = _mapper.Map<List<PlantDto>>(await _plantRepository.GetAllPlantsAsync());
            return Ok(plantsDto);
        }
        [HttpGet("GetPlantById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPlantById(int id)
        {
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByIdAsync(id));
            return plantDto == null ?   NotFound() : Ok(plantDto);
        }
        [HttpGet("GetPlantByName/{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPlantByName(string name)
        {
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByNameAsync(name));
            return  Ok(plantDto);
        }

        [HttpPost("AddPlant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddPlant([FromForm] PlantInDto plantInDto)
        {
           if (ModelState.IsValid)
            {
                var plant = _mapper.Map<Plant>(plantInDto);
                await _plantRepository.AddPlant(plant, plantInDto);
                return Ok("تمت اضافة النبات بنجاح");
            }
           return BadRequest();
        }
        [HttpDelete("DeletePlant/{plantId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePlant(int plantId)
        {
            var plant =  await _plantRepository.DeletePlantAsync(plantId);
            return plant.Message is "" ? Ok(plant) : NotFound(plant.Message);
        }

        [HttpGet("AllPlantTypes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllPlanttypes()
        {
            return Ok(await _plantRepository.GetAllPlantsTypeAsync());
        }

        [HttpGet("AllSoils")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllSoils()
        {
            return Ok(await _plantRepository.GetAllSoils());
        }
    }
}
