using FIHS.Models.CommentModels;

namespace FIHS.Interfaces.IComment
{
    public interface ICommentRepository
    {
         Task AddComment(Comment comment);
         void EditComment(Comment comment);
         void DeleteComment(Comment comment);
         Task<Comment> FindCommentById(int commentId);
         Task<bool> IsCommentExist(int commentId);
         IEnumerable<Comment> GetAllComments(Func<Comment,bool> func);
         bool HasReachedCommentsLimits(Func<Comment, bool> func);
    }
}
