using FIHS.Interfaces.IComment;
using FIHS.Models.CommentModels;
using Microsoft.EntityFrameworkCore;

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
        public async Task<bool> IsCommentExist(int commentId) => await _context.Comments.AnyAsync(c => c.Id == commentId);
        public IEnumerable<Comment> GetAllComments(Func<Comment, bool> func) =>
          _context.Comments.Include(c => c.User).AsNoTracking().Where(func).ToList();

        public bool HasReachedCommentsLimits(Func<Comment, bool> func) => _context.Comments.Count(func) == 5;

    }
}
