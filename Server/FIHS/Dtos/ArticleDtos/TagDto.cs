using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.ArticleDtos
{
    public class TagDto
    {
        [StringLength(500)]
        public string Tag { get; set; }
        public int ArticleId { get; set; }
    }
}
