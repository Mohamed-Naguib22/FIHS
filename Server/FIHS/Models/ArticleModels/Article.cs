using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Models.ArticleModels
{
    public class Article
    {
        public int Id { get; set; }
        [MaxLength(128)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string Overview { get; set; }
        [MaxLength(128)]
        public string Author { get; set; }
        public string ImgUrl { get; set; }
        public DateTime PublicationDate { get; set; }
        [ValidateNever]
        public IEnumerable<ArticleSection> ArticleSections { get; set; }
        [ValidateNever]
        public IEnumerable<ArticleTag> ArticleTags { get; set; }
        [ValidateNever, JsonIgnore]
        public IEnumerable<ArticleLike> ArticleLikes { get; set; }
    }
}
