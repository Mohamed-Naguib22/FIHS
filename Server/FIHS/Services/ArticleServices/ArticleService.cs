using AutoMapper;
using FIHS.Dtos.ArticleDtos;
using FIHS.Models.ArticleModels;
using FIHS.Interfaces;
using Microsoft.EntityFrameworkCore;
using FIHS.Interfaces.IArticle;
using Microsoft.AspNetCore.Identity;
using FIHS.Models.AuthModels;
using System.Linq;

namespace FIHS.Services.ArticleService
{
    public class ArticleService : BaseService, IArticleService
    {
        private readonly string _baseUrl;
        private readonly IConfiguration _configuration;
        public ArticleService(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            IImageService imageService,
            IMapper mapper, IConfiguration configuration) : base(context, userManager, mapper, imageService)
        {
            _configuration = configuration;
            _baseUrl = _configuration["BaseUrl"];
        }

        public async Task<IEnumerable<ReturnArticleDto>> GetAllArticlesAsync()
        {
            var likes = await _context.ArticleLikes.ToListAsync();

            var articles = await _context.Articles
                .Select(a => new ReturnArticleDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Author = a.Author,
                    ImgUrl = _baseUrl + a.ImgUrl,
                    NumOfLikes = a.ArticleLikes.Count()
                }).OrderByDescending(a => a.NumOfLikes).ToListAsync();

            return articles;
        }

        public async Task<ReturnArticleDto> GetArticleAsync(int articleId, string refreshToken)
        {
            var user = await GetUserByRefreshToken(refreshToken);

            var articles = await _context.Articles
                .Include(a => a.ArticleLikes)
                .Include(a => a.ArticleTags)
                .Include(a => a.ArticleSections)
                .ToListAsync();

            var article = articles.FirstOrDefault(a => a.Id == articleId);

            if (article == null)
                return new ReturnArticleDto { Succeeded = false, Message = "المقال غير موجود" };

            var articleDto = _mapper.Map<ReturnArticleDto>(article);

            var tags = _context.ArticleTags.Where(at => at.ArticleId == article.Id).Select(at => at.Tag);
            var liked = await _context.ArticleLikes.AnyAsync(al => al.ArticleId == article.Id && al.ApplicationUserId == user.Id);

            var similarArticles = articles.Where(a => a.ArticleTags.Any(at => tags.Contains(at.Tag)))
                .Where(a => a.Id != article.Id).Take(5);

            articleDto.SimilarArticles = similarArticles;
            articleDto.Liked = liked;

            return articleDto;
        }

        public async Task<IEnumerable<ReturnArticleDto>> SearchAsync(string query)
        {
            var articles = _context.Articles
                .Include(a => a.ArticleTags)
                .Include(a => a.ArticleLikes)
                .Include(a => a.ArticleSections)
                .Where(a => a.ArticleTags.Any(at => at.Tag.Contains(query)));

            var likes = await _context.ArticleLikes.ToListAsync();

            var articlesDto = await articles
                .Select(a => new ReturnArticleDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Author = a.Author,
                    ImgUrl = _baseUrl + a.ImgUrl,
                    NumOfLikes = a.ArticleLikes.Count()
                }).OrderByDescending(a => a.NumOfLikes).ToListAsync();

            return articlesDto;
        }

        public async Task<Article> AddArticleAsync(AddArticleDto articleDto)
        {
            var article = _mapper.Map<Article>(articleDto);
            article.ImgUrl = _imageService.SetImage(articleDto.Image);

            await _context.Articles.AddAsync(article);
            await _context.SaveChangesAsync();

            return article;
        }

        public async Task<ArticleTag> AddTagAsync(TagDto tagDto)
        {
            var tag = _mapper.Map<ArticleTag>(tagDto);

            await _context.ArticleTags.AddAsync(tag);
            await _context.SaveChangesAsync();

            return tag;
        }

        public async Task<ArticleSection> AddSectionAsync(SectionDto sectionDto)
        {
            var section = _mapper.Map<ArticleSection>(sectionDto);

            await _context.ArticleSections.AddAsync(section);
            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<bool> AddTagAsync(string content, int articleId)
        {
            var tag = new ArticleTag { Tag = content, ArticleId = articleId};

            await _context.ArticleTags.AddAsync(tag);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Article> UpdateArticleAsync(int articleId, UpdateArticleDto articleDto)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);

            if (article == null)
                return null;

            article.Title = articleDto.Title ?? article.Title;
            article.Overview = articleDto.Overview ?? article.Overview;
            article.Author = articleDto.Author ?? article.Author;
            article.PublicationDate = articleDto.PublicationDate ?? article.PublicationDate;

            if (articleDto.Image != null)
                article.ImgUrl = _imageService.SetImage(articleDto.Image, article.ImgUrl);

            _context.Articles.Update(article);
            await _context.SaveChangesAsync();

            return article;
        }

        public async Task<ArticleSection> UpdateSectionAsync(int sectionId, SectionDto sectionDto)
        {
            var section = await _context.ArticleSections.FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null)
                return null;

            section.Title = sectionDto.Title ?? section.Title;
            section.Content = sectionDto.Content ?? section.Content;
            section.ArticleId = sectionDto.ArticleId ?? section.ArticleId;

            _context.ArticleSections.Update(section);
            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<bool> DeleteArticleAsync(int articleId)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);

            if (article == null)
                return false;

            _context.Articles.Remove(article);
            _imageService.DeleteImage(article.ImgUrl);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteTagAsync(int tagId)
        {
            var tag = await _context.ArticleTags.FirstOrDefaultAsync(at => at.Id == tagId);

            if (tag == null)
                return false;

            _context.ArticleTags.Remove(tag);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteSectionAsync(int sectionId)
        {
            var section = await _context.ArticleSections.FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null)
                return false;

            _context.ArticleSections.Remove(section);
            await _context.SaveChangesAsync();

            return true;
        }
    }

}
