using FIHS.Models.CommentModels;

namespace FIHS.Interfaces.IComment
{
    public interface ICommentRepository
    {
         Task AddComment(Comment comment);
         Task<IEnumerable<Comment>> GetAllComments(int entityId, string entityType);
         void EditComment(Comment comment);
         void DeleteComment(Comment comment);
         Task<bool> HasReachedCommentsLimits(string userId, string entityType, int entityId);
         Task<Comment> FindCommentById(int commentId);
         Task<bool> IsCommentExist(int commentId);
    }
}
