namespace FIHS.Models.Weather
{
    public class WeatherResponse
    {
        public string Name { get; set; }
        public Main Main { get; set; }
        public Wind Wind { get; set; }
        public List<Weather> Weather { get; set; }
    }
}
