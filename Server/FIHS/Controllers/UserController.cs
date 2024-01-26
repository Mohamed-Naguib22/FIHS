using CarShopAPI.Helpers;
using FIHS.Dtos;
using FIHS.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly List<string> _allowedExtensions = new() { ".jpg", ".png", ".jpeg" };
        private const long _maxAllowedImageSize = 1048576;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfileAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.GetProfileAsync(refreshToken);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileModel model)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var modelValidation = ValidationHelper<UpdateProfileModel>.Validate(model);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var result = await _userService.UpdateProfileAsync(refreshToken, model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccountAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.DeleteAccountAsync(refreshToken);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok("Deleted successfully");
        }

        [HttpPost("set-image")]
        public async Task<IActionResult> SetImageAsync([FromForm] IFormFile imgFile)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            if (imgFile == null || imgFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imgFile.FileName).ToLower()))
                return BadRequest("This image extension is not allowed");

            if (imgFile.Length > _maxAllowedImageSize)
                return BadRequest("Max allowed image size is 1MB");

            var result = await _userService.SetImageAsync(refreshToken, imgFile);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok("Image set successfully");
        }

        [HttpDelete("delete-image")]
        public async Task<IActionResult> DeleteImageAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.DeleteImageAsync(refreshToken);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok("Image deleted successfully");
        }
    }
}
