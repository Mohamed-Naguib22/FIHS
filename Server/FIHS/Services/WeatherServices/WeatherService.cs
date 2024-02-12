using FIHS.Dtos.WeatherDtos;
using FIHS.Models.Weather;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using FIHS.Interfaces.IWeather;
using System.Globalization;

namespace FIHS.Services.WeatherServices
{
    public class WeatherService : IWeatherService
    {
        private readonly IConfiguration _configuration;
        const string LANGUAGE = "ar";
        const string UNITS = "metric";
        const string API_URL = "https://api.openweathermap.org/data/2.5/weather";
        public WeatherService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public WeatherDto GetForecast(string city)
        {
            string APP_ID = _configuration["ApiKeys:Weather"];

            var client = new RestClient($"{API_URL}?q={city}&appid={APP_ID}&lang={LANGUAGE}&units={UNITS}");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            if (!response.IsSuccessful)
                return new WeatherDto { Succeeded = false, Message = "ادخل اسم مدينة صالح" };

            var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<WeatherResponse>();

            if (content == null)
                return new WeatherDto { Succeeded = false, Message = "حدث خطأ ما" };

            var arabicCulture = new CultureInfo("ar-SA");

            var forecast = new WeatherDto
            {
                City = content.Name,
                Description = content.Weather[0].Description,
                Temperature = ConvertToArabicNumerals(content.Main.Temp.ToString("N0")),
                Humidity = ConvertToArabicNumerals(content.Main.Humidity.ToString()),
                Pressure = ConvertToArabicNumerals(content.Main.Pressure.ToString()),
                WindSpeed = ConvertToArabicNumerals(content.Wind.Speed.ToString("N2")),
                Succeeded = true
            };

            return forecast;
        }
        private string ConvertToArabicNumerals(string input)
        {
            string[] englishNumbers = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "." };
            string[] arabicNumbers = { "٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "," };

            for (int i = 0; i < englishNumbers.Length; i++)
            {
                input = input.Replace(englishNumbers[i], arabicNumbers[i]);
            }

            return input;
        }
    }
}
