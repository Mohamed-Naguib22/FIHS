using FIHS.Models.CommentModels;

namespace FIHS.Interfaces.IComment
{
    public interface ICommentRepository
    {
         Task AddComment(Comment comment);
         Task<IEnumerable<Comment>> GetAllComments(int entityId, string entityType);
         void EditComment(Comment comment);
         Task DeleteComment(int commentId);
    }
}
