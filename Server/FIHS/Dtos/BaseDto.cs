using System.Text.Json.Serialization;

namespace FIHS.Dtos;

public class BaseDto
{
    [JsonIgnore]
    public string? Message { get; set; }
    [JsonIgnore]
    public bool Succeeded { get; set; }
}
