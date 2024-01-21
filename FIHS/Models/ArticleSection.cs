using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Models
{
    public class ArticleSection
    {
        public int Id { get; set; }
        [MaxLength(128)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string Content { get; set; }
        public int ArticleId { get; set; }
        [ValidateNever, JsonIgnore]
        public Article Article { get; set; }
    }
}