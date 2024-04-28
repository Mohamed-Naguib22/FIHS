using FIHS.Dtos.Favourite;
using FIHS.Interfaces.IFavourite;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        private readonly IFavourite _favourite;
        public FavouriteController(IFavourite favourite)
        {
            _favourite = favourite;
        }
        [HttpGet("GetAllFavouritePlants/{userId}")]
        public async Task<IActionResult> GetAllFavouritePlants( string userId)
        {
            var result = await _favourite.GetFavouritePlants(userId);
            return Ok(result);
        }

        [HttpPost("AddFavouritePlant")]
        public async Task<IActionResult> AddFavouriteItem([FromBody] FavouriteItemAddRequest favourite)
        {
            var result = await _favourite.AddPlantToFavourite(favourite);
            return result == true ? Ok(new { Message = "تمت اضافة النبات الي المفضله" }) : BadRequest(new {Message = "هذا النبات مضاف مسبقا لقائمة المسبقة"});
        }
    }
}
