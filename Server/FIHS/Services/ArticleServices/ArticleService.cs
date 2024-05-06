using AutoMapper;
using FIHS.Dtos.ArticleDtos;
using FIHS.Models.ArticleModels;
using FIHS.Interfaces;
using FIHS.Interfaces.IArticle;
using FIHS.Extensions;
using FIHS.Dtos;
using FIHS.Interfaces.IUser;
using Newtonsoft.Json;
using RestSharp;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.ArticleService
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IImageService _imageService;
        private readonly string _apiKey;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private const string API_URL = "https://serpapi.com/search";
        private readonly ApplicationDbContext _context;
        public ArticleService(IArticleRepository articleRepository, IConfiguration configuration,
            IImageService imageService, IMapper mapper, ITokenService tokenService, ApplicationDbContext context)
        {
            _apiKey = configuration["ApiKeys:SerpApi"];
            _imageService = imageService;
            _articleRepository = articleRepository;
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<GetArticlesDto> SearchAsync(string topic, int num)
        {
            var client = new RestClient(API_URL);
            var request = new RestRequest(Method.GET);

            request.AddParameter("engine", "google_scholar");
            request.AddParameter("q", topic);
            request.AddParameter("api_key", _apiKey);
            request.AddParameter("hl", "ar");
            request.AddParameter("num", num);

            var response = await client.ExecuteAsync(request);

            if (!response.IsSuccessful)
                return new GetArticlesDto { Message = $"Error fetching articles", Succeeded = false };
                
            var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<ArticlesResponseDto>();

            if (content == null)
                return new GetArticlesDto { Message = "JSON Serialization Error", Succeeded = false };

            var articles = content.Organic_results?.Select(result => new ArticleApiModel
            {
                Position = result.Position,
                Title = result.Title,
                Link = result.Link,
                Snippet = result.Snippet,
                ResourceLink = result.Resources?.FirstOrDefault()?.Link,
                Author = result.Publication_info?.Authors?.FirstOrDefault()?.Name,
                AuthorProfileLink = result.Publication_info?.Authors?.FirstOrDefault()?.Link
            }).ToList();

             return new GetArticlesDto { Articles = articles, Succeeded = true };
        }

        public async Task<IEnumerable<Topic>> GetAllTopicsAsync() => await _context.Topics.ToListAsync();

        public async Task<bool> AddTopicAsync(Topic topic)
        {
            if (await _context.Topics.AnyAsync(t => t.Name == topic.Name))
                return false;

            await _context.Topics.AddAsync(topic);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteTopicAsync(int Id)
        {
            var topic = await _context.Topics.SingleOrDefaultAsync(t => t.Id == Id);
            
            if (topic == null)
                return false;

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return true;
        }

        //public async Task<(IEnumerable<ReturnArticlesDto>, int? nextPage)> GetAllArticlesAsync(int offset, int limit)
        //{
        //    var articles = _mapper.Map<IEnumerable<ReturnArticlesDto>>(await _articleRepository.GetAllArticlesAsync());
        //    return articles.OrderByDescending(a => a.NumOfLikes).Paginate(offset, limit);
        //}

        //public async Task<ReturnArticleDto> GetArticleAsync(int articleId, string? refreshToken)
        //{
        //    var article = await _articleRepository.GetArticleWithIncludesAsync(articleId);

        //    if (article == null)
        //        return new ReturnArticleDto { Succeeded = false, Message = "المقال غير موجود" };

        //    var articleDto = _mapper.Map<ReturnArticleDto>(article);

        //    var tags = article.ArticleTags.Select(at => at.Tag);

        //    var similarArticles = await _articleRepository.GetSimilarArticlesAsync(articleId, tags);
        //    articleDto.SimilarArticles = _mapper.Map<IEnumerable<ReturnArticlesDto>>(similarArticles).OrderByDescending(a => a.NumOfLikes);

        //    articleDto.Succeeded = true;

        //    if (refreshToken != null)
        //    {
        //        var user = await _tokenService.GetUserByRefreshToken(refreshToken);

        //        if (user != null)
        //            articleDto.Liked = await _articleRepository.GetArticleLikeAsync(articleId, user.Id) != null;
        //    }

        //    return articleDto;
        //}

        //public async Task<BaseDto> LikeAsync(int articleId, string refreshToken)
        //{
        //    var dto = new BaseDto();

        //    var user = await _tokenService.GetUserByRefreshToken(refreshToken);

        //    if (user == null)
        //        return new BaseDto { Succeeded = false, Message = "Invalid Token." };

        //    if (await _articleRepository.GetArticleByIdAsync(articleId) == null)
        //        return new BaseDto { Succeeded = false, Message = "المقال غير موجود" };

        //    var like = await _articleRepository.GetArticleLikeAsync(articleId, user.Id);

        //    if (like == null)
        //    {
        //        await _articleRepository.AddLikeAsync(new ArticleLike { ArticleId = articleId, ApplicationUserId = user.Id });
        //        dto.Succeeded = true;
        //        dto.Message = "تم اضافة الاعجاب بنجاح";
        //    }
        //    else
        //    {
        //        await _articleRepository.RemoveLikeAsync(like);
        //        dto.Succeeded = true;
        //        dto.Message = "تم ازالة الاعجاب بنجاح";
        //    }
        //    return dto;
        //}

        //public async Task<(IEnumerable<ReturnArticlesDto>, int? nextPage)> SearchAsync(string query, int offset, int limit)
        //{
        //    var articles = await _articleRepository.SearchAsync(query);

        //    var articlesDto = _mapper.Map<IEnumerable<ReturnArticlesDto>>(articles);

        //    return articlesDto.OrderByDescending(a => a.NumOfLikes).Paginate(offset, limit);
        //}

        //public async Task<Article> AddArticleAsync(AddArticleDto articleDto)
        //{
        //    var article = _mapper.Map<Article>(articleDto);
        //    article.ImgUrl = _imageService.SetImage(articleDto.Image);

        //    await _articleRepository.AddArticleAsync(article);
        //    return article;
        //}

        //public async Task<ArticleTag> AddTagAsync(TagDto tagDto)
        //{
        //    var tag = _mapper.Map<ArticleTag>(tagDto);
        //    await _articleRepository.AddTagAsync(tag);
        //    return tag;
        //}

        //public async Task<ArticleSection> AddSectionAsync(AddSectionDto sectionDto)
        //{
        //    var section = _mapper.Map<ArticleSection>(sectionDto);
        //    await _articleRepository.AddSectionAsync(section);
        //    return section;
        //}

        //public async Task<Article> UpdateArticleAsync(int articleId, UpdateArticleDto articleDto)
        //{
        //    var article = await _articleRepository.GetArticleByIdAsync(articleId);

        //    if (article == null)
        //        return null;

        //    article.Title = articleDto.Title ?? article.Title;
        //    article.Overview = articleDto.Overview ?? article.Overview;
        //    article.Author = articleDto.Author ?? article.Author;
        //    article.PublicationDate = articleDto.PublicationDate ?? article.PublicationDate;

        //    if (articleDto.Image != null)
        //        article.ImgUrl = _imageService.SetImage(articleDto.Image, article.ImgUrl);

        //    await _articleRepository.UpdateArticleAsync(article);
        //    return article;
        //}

        //public async Task<ArticleSection> UpdateSectionAsync(int sectionId, UpdateSectionDto sectionDto)
        //{
        //    var section = await _articleRepository.GetSectionAsync(sectionId);

        //    if (section == null)
        //        return null;

        //    section.Title = sectionDto.Title ?? section.Title;
        //    section.Content = sectionDto.Content ?? section.Content;
        //    section.ArticleId = sectionDto.ArticleId ?? section.ArticleId;

        //    await _articleRepository.UpdateSectionAsync(section);
        //    return section;
        //}

        //public async Task<bool> DeleteArticleAsync(int articleId)
        //{
        //    var article = await _articleRepository.GetArticleByIdAsync(articleId);

        //    if (article == null)
        //        return false;

        //    await _articleRepository.RemoveArticleAsync(article);   
        //    _imageService.DeleteImage(article.ImgUrl);

        //    return true;
        //}

        //public async Task<bool> DeleteSectionAsync(int sectionId)
        //{
        //    var section = await _articleRepository.GetSectionAsync(sectionId);

        //    if (section == null)
        //        return false;

        //    await _articleRepository.RemoveSectionAsync(section);
        //    return true;
        //}

        //public async Task<bool> DeleteTagAsync(int tagId)
        //{
        //    var tag = await _articleRepository.GetTagAsync(tagId);

        //    if (tag == null)
        //        return false;

        //    await _articleRepository.RemoveTagAsync(tag);
        //    return true;
        //}
    }
}