using System.Text.Json.Serialization;

namespace FIHS.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int ConversationId { get; set; }
        [JsonIgnore]
        public Conversation Conversation { get; set; }
    }
}
