using AutoMapper;
using CarShopAPI.Helpers;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using FIHS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileModel model)
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
            var userId = user?.Id;
            //var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            //if (userId == null)
            //    return BadRequest("Invalid token");

            var modelValidation = ValidationHelper<UpdateProfileModel>.Validate(model);
            if (!string.IsNullOrEmpty(modelValidation))
                return BadRequest(modelValidation);

            var result = await _userService.UpdateProfileAsync(userId, model);

            if (!string.IsNullOrEmpty(result.Message))
                return BadRequest(result.Message);

            return Ok(result);
        }
        [HttpDelete("deleteAccount")]
        public async Task<IActionResult> DeleteAccountAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            var result = await _userService.DeleteAccountAsync(userId);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Deleted successfully");
        }
        [HttpPost("setImage")]
        public async Task<IActionResult> SetImageAsync([FromForm] IFormFile imgFile)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            if (imgFile == null || imgFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imgFile.FileName).ToLower()))
                return BadRequest("This image extension is not allowed");

            if (imgFile.Length > _maxAllowedImageSize)
                return BadRequest("Max allowed image size is 1MB");

            var result = await _userService.SetImageAsync(userId, imgFile);

            if (!result)
                return BadRequest("Field to set the image.");

            return Ok("Image set successfully");
        }
        [HttpDelete("deleteImage")]
        public async Task<IActionResult> DeleteImageAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            var result = await _userService.DeleteImageAsync(userId);

            if (!result)
                return BadRequest("Something went wrong");

            return Ok("Image deleted successfully");
        }
    }
}
