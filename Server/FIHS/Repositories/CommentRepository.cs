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
        private async Task<Comment> FindCommentById(int commentId) => await _context.Comments.FindAsync(commentId);
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
        public async Task DeleteComment(int commentId)
        {
            var comment = await FindCommentById(commentId);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
            }
        }

        public bool IsCommentExist(int commentId) =>  _context.Comments.Any(c => c.Id == commentId);

    }
}
