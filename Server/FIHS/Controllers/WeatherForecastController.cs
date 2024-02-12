using FIHS.Interfaces.IWeather;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IWeatherService _weatherService;
        public WeatherForecastController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("get-forecast")]
        public IActionResult GetForecast(string city)
        {
            var result = _weatherService.GetForecast(city);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(result);
        }
    }
}
