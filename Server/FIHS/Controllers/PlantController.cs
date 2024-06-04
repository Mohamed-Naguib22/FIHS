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
using FIHS.Dtos.PlantTypeDtos;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {

        private readonly IPlantServices _plantServices;
        public PlantController( IPlantServices plantServices)
        {

            _plantServices = plantServices;
        }
        [HttpGet("GetAllPlants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllPlants([FromQuery]GetAllPlantsParams patameters)
        {
            var plantsDto = await _plantServices.GetAllPlantsAsync(patameters);
            return Ok(new  {Plant = plantsDto.Take(patameters.limit).ToList(),NextPage = patameters.limit < plantsDto.Count() ? patameters.offset + 1:0 });
        }
        [HttpGet("GetPlantById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPlantById(int id, int favId = 0)
        {
            var plantDto = await _plantServices.GetPlantByIdAsync(id,favId);
            return plantDto == null ?   NotFound() : Ok(plantDto);
        }

        [HttpPost("AddPlant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddPlant([FromForm] PlantInDto plantInDto)
        {
           if (ModelState.IsValid)
            {
               bool result = await _plantServices.AddPlant(plantInDto);
                return result? Ok("تمت اضافة النبات بنجاح"):BadRequest("هذا النبات موجود مسبقا");
            }
           return BadRequest(" حدث خطأ تأكد من ان البيانات المدخله صحيحه");
        }
        [HttpPut("UpdatePlantImage/{plantId}")]
        public async Task<IActionResult> UpdatePlantImage( int plantId ,  IFormFile imgFile)
        {
            var result =  await _plantServices.UpdateImage(plantId, imgFile);
            return result != string.Empty ? Ok(result) : NotFound("لا يوجد نبات بهذا الرقم");
        }
        [HttpDelete("DeletePlant/{plantId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePlant(int plantId)
        {
            var result =  await _plantServices.DeletePlantAsync(plantId);
            return result ? Ok("تم حذف النبات بنجاح") : NotFound("لا يوجد نبات بهذا الرقم");
        }

        [HttpGet("AllPlantTypes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllPlanttypes()
        {
            return Ok(await _plantServices.GetAllPlantsTypeAsync());
        }

        [HttpGet("AllSoils")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllSoils()
        {
            return Ok(await _plantServices.GetAllSoils());
        }

        [HttpPost("AddPlantType")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddPlantTypeAsync([FromForm] AddPlantTypeDto plantTypeDto)
        {
            await _plantServices.AddPlantTyeAsync(plantTypeDto);
            return Created("Created", "تم الاضافة بنجاح");
        }

        [HttpDelete("DeletePlantType/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePlantTypeAsync(int id)
        {
            var result = await _plantServices.DeletePlantTyeAsync(id);

            if (!result)
                return NotFound("Entity not found");

            return Ok("تم الحذف بنجاح");
        }
    }
}
