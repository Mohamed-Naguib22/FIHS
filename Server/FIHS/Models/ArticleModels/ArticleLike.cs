using FIHS.Models.AuthModels;

namespace FIHS.Models.ArticleModels
{
    public class ArticleLike
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public string ApplicationUserId { get; set; }
        public DateTime Timespan { get; set; }
        public Article Article { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public ArticleLike()
        {
            Timespan = DateTime.Now;
        }
    }
}
