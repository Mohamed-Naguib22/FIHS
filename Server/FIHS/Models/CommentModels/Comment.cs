using FIHS.Models.AuthModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.PestModels;
using FIHS.Models.PlantModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIHS.Models.CommentModels
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string EntityType { get; set; }
        [Required]
        public int EntityId { get; set; }
        [Required, MinLength(2, ErrorMessage = "يجب ان يكوت التعليق اكثر من حرفين"), MaxLength(512, ErrorMessage = "لا يمكن ان يتعدي التعليق 512 حرف")]
        public string CommentBody { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
