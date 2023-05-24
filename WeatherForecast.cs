namespace Charting_Workshop
{
    public class WeatherForecast
    {
        public DateOnly Label { get; set; }

        public int Value { get; set; }

        public int TemperatureF => 32 + (int)(Value / 0.5556);

        public string? Summary { get; set; }
    }
}