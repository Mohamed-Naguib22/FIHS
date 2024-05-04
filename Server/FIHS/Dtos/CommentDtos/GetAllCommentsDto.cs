using FIHS.Models.AuthModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.PestModels;
using FIHS.Models.PlantModels;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FIHS.Dtos.UserDtos;

namespace FIHS.Dtos.CommentDtos
{
    public class GetAllCommentsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string EntityType { get; set; }
        public int EntityId { get; set; }
        public string CommentBody { get; set; }
        public virtual CommentUserDto User { get; set; }
    }
}
