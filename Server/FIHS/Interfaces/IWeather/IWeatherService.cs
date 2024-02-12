using FIHS.Dtos.WeatherDtos;

namespace FIHS.Interfaces.IWeather
{
    public interface IWeatherService
    {
        WeatherDto GetForecast(string city);
    }
}
