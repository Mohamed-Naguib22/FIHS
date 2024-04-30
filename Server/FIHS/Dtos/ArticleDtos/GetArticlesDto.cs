using FIHS.Models.ArticleModels;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.ArticleDtos
{
    public class GetArticlesDto
    {
        public IEnumerable<ArticleApiModel> Articles { get; set; }
        [JsonIgnore]
        public string Message { get; set; }
        [JsonIgnore]
        public bool Succeeded { get; set; }
    }
}
