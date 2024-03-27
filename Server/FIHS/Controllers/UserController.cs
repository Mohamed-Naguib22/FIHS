using CarShopAPI.Helpers;
using FIHS.Dtos;
using FIHS.Dtos.UserDtos;
using FIHS.Interfaces.IUser;
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

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel model)
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _userService.ChangePasswordAsync(refreshToken, model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

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

            return Ok("تم حذف الحساب بنجاح");
        }

        [HttpPost("set-image")]
        public async Task<IActionResult> SetImageAsync([FromForm] ImageDto imageDto)
        {
            var imgFile = imageDto.ImgFile;
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            if (imgFile == null || imgFile.Length == 0)
                return BadRequest("Image file is required.");

            if (!_allowedExtensions.Contains(Path.GetExtension(imgFile.FileName).ToLower()))
                return BadRequest("نوع الملف هذا غير مسموح به");

            if (imgFile.Length > _maxAllowedImageSize)
                return BadRequest("الحجم الأقصى المسموح به للصورة هو 1 ميغابايت");

            var result = await _userService.SetImageAsync(refreshToken, imgFile);

            if (!result.Succeeded)
                return BadRequest(result.Message);
            
            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
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

            return Ok(result);
        }

        private void SetRefreshTokenInCookie(string refreshToken, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Expires = expires.ToLocalTime(),
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
