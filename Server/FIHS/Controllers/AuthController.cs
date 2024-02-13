using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;
using FIHS.Interfaces.IUser;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAysnc([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var result = await _authService.RegisterAysnc(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok("يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك");
        }

        [HttpPost("verifyAccout")]
        public async Task<IActionResult> VerifyAccountAsync([FromBody] VerifyAccountModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.VerifyAccountAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }

        [HttpPost("forgetPassword")]
        public async Task<IActionResult> ForgetPasswordAsync([FromBody] ForgetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.ForgetPasswordAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.ResetPasswordAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok("تمت إعادة تعيين كلمة المرور بنجاح");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] TokenrRequestModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            if (!string.IsNullOrEmpty(result.RefreshToken))
                SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }

        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel model)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (userId == null)
                return BadRequest("Invalid token");

            var result = await _authService.ChangePasswordAsync(userId, model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }

        [HttpPost("addRole")]
        public async Task<IActionResult> AddRoleAsync([FromBody] AddRoleModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.AddRoleAysnc(model);

            if (!string.IsNullOrEmpty(result))
                return BadRequest(result);

            return Ok(model);
        }

        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            
            var result = await _authService.RefreshTokenAsync(refreshToken);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);
            
            return Ok(result);
        }

        [HttpPost("revokeToken")]
        public async Task<IActionResult> RevokeTokenAsync([FromBody] RevokeToken model)
        {
            var refreshToken = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Token is required!");

            var result = await _authService.RevokeTokenAsync(refreshToken);

            if (!result)
                return BadRequest("Token is invalid!");

            return Ok();
        }

        private void SetRefreshTokenInCookie(string refreshToken, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = expires.ToLocalTime(),
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
