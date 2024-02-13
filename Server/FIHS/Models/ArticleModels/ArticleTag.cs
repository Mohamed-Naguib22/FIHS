using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Models.ArticleModels
{
    public class ArticleTag
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public string Tag { get; set; }
        public int ArticleId { get; set; }
        [ValidateNever, JsonIgnore]
        public Article Article { get; set; }
    }
}
