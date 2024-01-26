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
        [HttpGet("GetPlantById{id}")]
        public async Task<IActionResult> GetPlantById(int id)
        {
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByIdAsync(id));
            return plantDto == null ? Ok(plantDto) : NotFound(); ;
        }
        [HttpGet("GetPlantByName{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPlantByName(string name)
        {
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByNameAsync(name));
            return  Ok(plantDto);
        }
        /// <summary>
        /// Add New Plant
        /// </summary>
        /// <param name="plantInDto"></param>
        /// <returns></returns>
        [HttpPost("AddPlant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddPlant([FromForm] PlantInDto plantInDto)
        {
           if (ModelState.IsValid)
            {
                var plant = _mapper.Map<Plant>(plantInDto);
                _plantRepository.AddPlant(plant, plantInDto);
                return Ok("Plant Added Succefully");
            }
           return BadRequest();
        }
    }
}
