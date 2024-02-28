using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.WeatherDtos
{
    public class WeatherDto
    {
        public string City { get; set; }
        public string Description { get; set; }
        public string Temperature { get; set; }
        public string Pressure { get; set; }
        public string Icon { get; set; }
        public string Humidity { get; set; }
        public string WindSpeed { get; set; }
        [ValidateNever, JsonIgnore]
        public string? Message { get; set; }
        [ValidateNever, JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
