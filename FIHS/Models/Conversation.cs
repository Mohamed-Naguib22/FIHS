using System.Text.Json.Serialization;

namespace FIHS.Models
{
    public class Conversation
    {
        public string Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string ApplicationUserId { get; set; }
        [JsonIgnore]
        public ApplicationUser ApplicationUser { get; set; }
        [JsonIgnore]
        public IEnumerable<Message> Messages { get; set; }
    }
}
