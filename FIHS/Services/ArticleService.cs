using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces;
using FIHS.Models;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class ArticleService : BaseService, IArticleService
    {
        public ArticleService(ApplicationDbContext context,
            IImageService imageService,
            IMapper mapper) : base(context, null, mapper, imageService)
        {
        }

        public async Task<Article> GetArticleAsync(int articleId)
        {
            var article = await _context.Articles.Include(a => a.ArticleSections).FirstOrDefaultAsync(a => a.Id == articleId);

            return article;
        }

        public async Task<Article> AddArticleAsync(ArticleDto inputDto)
        {
            var article = _mapper.Map<Article>(inputDto);
            article.ImgUrl = _imageService.SetImage(article.ImgUrl, inputDto.Image);

            await _context.Articles.AddAsync(article);
            await _context.SaveChangesAsync();

            return article;
        }

        public async Task<ArticleSection> AddSectionAsync(ArticleSection section)
        {
            await _context.ArticleSections.AddAsync(section);
            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<string> DeleteArticleAsync(int articleId)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return "Deleted Successfully";
        }
    }
}
