using FIHS.Dtos.WeatherDtos;

namespace FIHS.Interfaces.IWeather
{
    public interface IWeatherService
    {
        Task<WeatherDto> GetForecast(string city);
    }
}
