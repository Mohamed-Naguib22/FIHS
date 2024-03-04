using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;
using FIHS.Interfaces.IUser;
using Microsoft.AspNetCore.Authorization;
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

            return Ok("يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك");
        }

        [HttpPost("verify-account")]
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

        [HttpGet("resend-verification-code")]
        public async Task<IActionResult> ResendVerificationCodeAsync([FromBody] EmailModel model)
        {
            var result = await _authService.ResendVerificationCodeAsync(model);
         
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPasswordAsync([FromBody] EmailModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.ForgetPasswordAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.ResetPasswordAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
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

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");

            return Ok("تم تسجيل الخروج بنجاح");
        }

        [HttpPost("add-role")]
        public async Task<IActionResult> AddRoleAsync([FromBody] AddRoleModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.AddRoleAysnc(model);

            if (!string.IsNullOrEmpty(result))
                return BadRequest(result);

            return Ok(model);
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            
            var result = await _authService.RefreshTokenAsync(refreshToken);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);
            
            return Ok(result);
        }

        [HttpPost("revoke-token")]
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
