using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Build.Framework;

namespace FIHS.Models.ArticleModels
{
    public class Topic
    {
        [ValidateNever]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [ValidateNever]
        public DateTime AddedOn { get; set; } = DateTime.Now;
    }
}
