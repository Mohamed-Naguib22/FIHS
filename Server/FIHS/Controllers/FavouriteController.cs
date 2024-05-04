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
        [HttpGet("GetAllFavouritePlants/{favouriteId}")]
        public async Task<IActionResult> GetAllFavouritePlants( int favouriteId)
        {
            var result = await _favourite.GetFavouritePlants(favouriteId);
            return Ok(result);
        }

        [HttpPost("AddFavouritePlant")]
        public async Task<IActionResult> AddFavouriteItem([FromBody] FavouriteItemAddRequest favourite)
        {
            var result = await _favourite.AddPlantToFavourite(favourite);
            return result == true ? Ok(new { Message = "تمت اضافة النبات الي المفضله" }) : BadRequest(new {Message = "هذا النبات مضاف مسبقا لقائمة المسبقة"});
        }
        [HttpDelete("DeleteItemFromFavourite")]
        public async Task<IActionResult> DeleteFavouriteItem(int FavoriteId , int plantId )
        {
           bool result =await _favourite.DeleteFavouriteItem(FavoriteId,plantId);
            return result ? Ok(new { Message = "تم حذف النبات من قائمة المفضله بنجاح" }) : BadRequest(new { Message = "حدث خطأ ما " });
        }

    }
}
