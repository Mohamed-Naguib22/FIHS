using System.Text.Json.Serialization;

namespace FIHS.Models.ChatGPT
{
    public class AnswerModel
    {
        public string Answer { get; set; }
        [JsonIgnore]
        public string? Message { get; set; }
        [JsonIgnore]
        public int StatusCode { get; set; }
        [JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
