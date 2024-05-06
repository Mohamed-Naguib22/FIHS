using System.Text.Json.Serialization;

namespace FIHS.Dtos.CommentDtos
{
    public class AddCommentsDto
    {
        public int Id { get; set; }
        public string EntityType { get; set; }
        public int EntityId { get; set; }
        public string refreshToken { get; set; } = string.Empty;
        public string CommentBody { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
