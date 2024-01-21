using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Models
{
    public class Message
    {
        public Message(string sender, string content, string chatId)
        {
            Sender = sender;
            Content = content;
            Timestamp = DateTime.Now;
            ChatId = chatId;
        }

        public int Id { get; set; }
        [MaxLength(128)]
        public string Sender { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public string ChatId { get; set; }
        [JsonIgnore]
        public Chat Chat { get; set; }
    }
}
