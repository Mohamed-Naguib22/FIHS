namespace FIHS.Models.ArticleModels
{
    public class ArticleApiModel
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Snippet { get; set; }
        public string Author { get; set; }
        public string AuthorProfileLink { get; set; }
    }
    public class ArticlesResponseDto
    {
        public List<OrganicResult> Organic_results { get; set; }
    }

    public class OrganicResult
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Snippet { get; set; }
        public PublicationInfo Publication_info { get; set; }
    }

    public class PublicationInfo
    {
        public List<Author> Authors { get; set; }
    }

    public class Author
    {
        public string Name { get; set; }
        public string Link { get; set; }
    }
}
