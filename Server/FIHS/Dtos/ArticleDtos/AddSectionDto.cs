using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.ArticleDtos
{
    public class AddSectionDto
    {
        [StringLength(128)]
        public string Title { get; set; }
        [StringLength(500)]
        public string Content { get; set; }
        public int ArticleId { get; set; }
    }
}
