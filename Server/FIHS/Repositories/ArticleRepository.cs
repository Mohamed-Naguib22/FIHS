using Azure;
using FIHS.Interfaces.IArticle;
using FIHS.Models.ArticleModels;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Repositories;

public class ArticleRepository : IArticleRepository
{
    private readonly ApplicationDbContext _context;
    public ArticleRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    private IQueryable<Article> GetArticlesWithLikes() =>
        _context.Articles.Include(a => a.ArticleLikes);
 
    public async Task<IEnumerable<Article>> GetAllArticlesAsync() =>
       await GetArticlesWithLikes().ToListAsync();

    public async Task<IEnumerable<Article>> GetSimilarArticlesAsync(int articleId, IEnumerable<string> tags) =>
        await GetArticlesWithLikes().Where(a => a.Id != articleId && a.ArticleTags.Any(at => tags.Contains(at.Tag))).Take(5).ToListAsync();

    public async Task<IEnumerable<Article>> SearchAsync(string query) =>
       await GetArticlesWithLikes().Include(a => a.ArticleTags)
        .Where(a => a.ArticleTags.Any(at => at.Tag.Contains(query))).ToListAsync();

    public async Task<Article?> GetArticleWithIncludesAsync(int id) =>
        await _context.Articles.Include(a => a.ArticleLikes).Include(a => a.ArticleSections)
        .Include(a => a.ArticleTags).FirstOrDefaultAsync(a => a.Id == id);
    
    public async Task<Article?> GetArticleByIdAsync(int id) =>
        await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);

    public async Task<ArticleLike?> GetArticleLikeAsync(int articleId, string userId) =>
        await _context.ArticleLikes.SingleOrDefaultAsync(al => al.ArticleId == articleId && al.ApplicationUserId == userId);

    public async Task AddLikeAsync(ArticleLike like)
    {
        await _context.ArticleLikes.AddAsync(like);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveLikeAsync(ArticleLike like)
    {
        _context.ArticleLikes.Remove(like);
        await _context.SaveChangesAsync();
    }

    public async Task AddArticleAsync(Article article)
    {
        await _context.Articles.AddAsync(article);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateArticleAsync(Article article)
    {
        _context.Articles.Update(article);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveArticleAsync(Article article)
    {
        _context.Articles.Remove(article);
        await _context.SaveChangesAsync();
    }

    public async Task<ArticleSection?> GetSectionAsync(int id) =>
        await _context.ArticleSections.FirstOrDefaultAsync(s => s.Id == id);

    public async Task<ArticleTag?> GetTagAsync(int id) =>
        await _context.ArticleTags.FirstOrDefaultAsync(t => t.Id == id);

    public async Task AddSectionAsync(ArticleSection section)
    {
        await _context.ArticleSections.AddAsync(section);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSectionAsync(ArticleSection section)
    {
        _context.ArticleSections.Update(section);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveSectionAsync(ArticleSection section)
    {
        _context.ArticleSections.Remove(section);
        await _context.SaveChangesAsync();
    }

    public async Task AddTagAsync(ArticleTag tag)
    {
        await _context.ArticleTags.AddAsync(tag);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveTagAsync(ArticleTag tag)
    {
        _context.ArticleTags.Remove(tag);
        await _context.SaveChangesAsync();
    }
}
