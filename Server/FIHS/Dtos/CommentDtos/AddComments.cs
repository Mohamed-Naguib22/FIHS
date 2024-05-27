using System.Text.Json.Serialization;

namespace FIHS.Dtos.CommentDtos
{
    public class AddCommentsDto
    {
        public int Id { get; set; }
        public string EntityType { get; set; }
        public int? PlantId { get; set; }
        public int? PestId { get; set; }
        public int? DiseaseId { get; set; }
        public string refreshToken { get; set; } = string.Empty;
        public string CommentBody { get; set; }
        public string UserId { get; set; }=string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
