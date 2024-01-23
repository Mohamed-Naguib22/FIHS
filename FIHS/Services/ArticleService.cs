using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class ArticleService : BaseService, IArticleService
    {
        private readonly string _baseUrl;
        public ArticleService(ApplicationDbContext context,
            IImageService imageService,
            IMapper mapper,
            IConfiguration configuration) : base(context, null, mapper, imageService)
        {
            _baseUrl = configuration["BaseUrl"];
        }

        public async Task<IEnumerable<Article>> GetAllArticlesAsync()
        {
            var articles = await _context.Articles.Include(a => a.ArticleSections).ToListAsync();
            articles.ForEach(a => a.ImgUrl = _baseUrl + a.ImgUrl);

            return articles;
        }

        public async Task<Article> GetArticleAsync(int articleId)
        {
            var article = await _context.Articles.Include(a => a.ArticleSections).FirstOrDefaultAsync(a => a.Id == articleId);

            return article;
        }

        public async Task<IEnumerable<Article>> SearchAsync(string query)
        {
            var articles = await _context.Articles.Include(a => a.ArticleSections)
                .Where(a => a.Title.Contains(query)).ToListAsync();
            articles.ForEach(a => a.ImgUrl = _baseUrl + a.ImgUrl);

            return articles;
        }

        public async Task<Article> AddArticleAsync(ArticleDto articleDto)
        {
            var article = _mapper.Map<Article>(articleDto);
            article.ImgUrl = _imageService.SetImage(articleDto.Image);

            await _context.Articles.AddAsync(article);
            await _context.SaveChangesAsync();

            return article;
        }

        public async Task<ArticleSection> AddSectionAsync(ArticleSectionDto sectionDto)
        {
            var section = _mapper.Map<ArticleSection>(sectionDto);

            await _context.ArticleSections.AddAsync(section);
            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<Article> UpdateArticleAsync(int articleId, ArticleDto articleDto)
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

        public async Task<ArticleSection> UpdateSectionAsync(int sectionId, ArticleSectionDto sectionDto)
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
