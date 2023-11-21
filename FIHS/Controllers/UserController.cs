using AutoMapper;
using CarShopAPI.Helpers;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly List<string> _allowedExtensions = new() { ".jpg", ".png", "jpeg" };
        private const long _maxAllowedImageSize = 1048576;
        public UserController(IUserService userService, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfileAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.GetProfileAsync(refreshToken);

            if (!string.IsNullOrEmpty(result.Message))
                return BadRequest(result.Message);

            return Ok(result);
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileModel model)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var modelValidation = ValidationHelper<UpdateProfileModel>.Validate(model);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var result = await _userService.UpdateProfileAsync(refreshToken, model);

            if (!string.IsNullOrEmpty(result.Message))
                return BadRequest(result.Message);

            return Ok(result);
        }
        [HttpDelete("deleteAccount")]
        public async Task<IActionResult> DeleteAccountAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.DeleteAccountAsync(refreshToken);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Deleted successfully");
        }
        [HttpPost("setImage")]
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

            if (!result)
                return BadRequest("Faild to set the image.");

            return Ok("Image set successfully");
        }
        [HttpDelete("deleteImage")]
        public async Task<IActionResult> DeleteImageAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.DeleteImageAsync(refreshToken);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Image deleted successfully");
        }
    }
}
