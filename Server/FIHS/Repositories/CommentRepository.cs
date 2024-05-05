using FIHS.Interfaces.IComment;
using FIHS.Models.CommentModels;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace FIHS.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Comment> FindCommentById(int commentId) => await _context.Comments.FindAsync(commentId);
        public async Task AddComment(Comment comment) 
        {
            await _context.Comments.AddAsync(comment);
            _context.SaveChanges();
        }
        public async Task<IEnumerable<Comment>> GetAllComments(int entityId , string entityType) => 
            await _context.Comments.Where(c => c.EntityId == entityId && c.EntityType == entityType).Include(c => c.User).AsNoTracking().ToListAsync();
        public void EditComment(Comment comment)
        {
            _context.Update(comment);
            _context.SaveChanges();
        }
        public void DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
            _context.SaveChanges();
        }
        public async Task<bool> IsCommentExist(int commentId) =>await _context.Comments.AnyAsync(c=>c.Id == commentId);
        public async Task<bool> HasReachedCommentsLimits(string userId,string entityType,int entityId) => await _context.Comments.CountAsync(c=>c.UserId == userId&&c.EntityType==entityType&&c.EntityId==entityId)>=5;

    }
}
