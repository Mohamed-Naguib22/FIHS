using FIHS.Models.AuthModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.PestModels;
using FIHS.Models.PlantModels;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.CommentModels
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public int? DiseaseId { get; set; }
        public int? PestId { get; set; }
        public int? PlantId { get; set; }
        
        [Required, MinLength(2, ErrorMessage = "يجب ان يكوت التعليق اكثر من حرفين"), MaxLength(512, ErrorMessage = "لا يمكن ان يتعدي التعليق 512 حرف")]
        public string CommentBody { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Disease Disease { get; set; }
        public virtual Pest Pest { get; set; }
        public virtual Plant Plant { get; set; }
    }
}
