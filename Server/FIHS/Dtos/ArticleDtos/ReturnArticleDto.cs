using FIHS.Models.ArticleModels;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.ArticleDtos
{
    public class ReturnArticleDto : BaseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Overview { get; set; }
        public string Author { get; set; }
        public string ImgUrl { get; set; }
        public DateTime? PublicationDate { get; set; }
        public bool Liked { get; set; }
        public int NumOfLikes { get; set; }
        public IEnumerable<ArticleSection> ArticleSections { get; set; }
        public IEnumerable<string> ArticleTags { get; set; }
        public IEnumerable<ReturnArticlesDto> SimilarArticles { get; set; }
    }
}
