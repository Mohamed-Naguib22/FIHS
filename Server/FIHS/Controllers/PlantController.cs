using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using FIHS.Models.PlantModels;
using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces.IPlant;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using FIHS.Interfaces;
using FIHS.Extensions;
using FIHS.Interfaces.IFavourite;

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
        private readonly IFavourite _favourite;
        public PlantController(ApplicationDbContext context, IMapper mapper, IPlantRepository plantRepository, IImageService imageService, IFavourite favourite)
        {
            _context = context;
            _mapper = mapper;
            _plantRepository = plantRepository;
            _imageService = imageService;
            _favourite = favourite;
        }
        [HttpGet("GetAllPlants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllPlants([FromQuery]GetAllPlantsParams patameters)
        {
            var plants = await _plantRepository.GetAllPlantsAsync(patameters.plantTypeId, patameters.offset, patameters.limit);
            var plantsDto = _mapper.Map<List<PlantDto>>(plants).MarkFavPlants(await _favourite.GetFavouritePlants(patameters.FavId));
            return Ok(new  {Plant = plantsDto.Take(patameters.offset).ToList(),NextPage = patameters.limit < plantsDto.Count ? patameters.offset + 1:0 });
        }
        [HttpGet("GetPlantById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPlantById(int id, int favId = 0)
        {
            
            var plantDto = _mapper.Map<PlantDto>(await _plantRepository.GetPlantByIdAsync(id));
            plantDto.IsFav =await _favourite.IsFavouriteItemExist(new Dtos.Favourite.FavouriteItemAddRequest() { FavouriteId = favId,PlantId=id});
            return plantDto == null ?   NotFound() : Ok(plantDto);
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
