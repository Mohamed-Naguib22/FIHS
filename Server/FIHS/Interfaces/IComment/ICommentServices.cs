using FIHS.Dtos.CommentDtos;

namespace FIHS.Interfaces.IComment
{
    public interface ICommentServices
    {
         Task<string> AddCommentAsync(AddCommentsDto addCommentsDto);
         Task<bool> DeleteCommentAsync(int commentId);
         Task<IEnumerable<GetAllCommentsDto>> GetAllEntityComments(int entityId, string entityType);
         Task<string> EditCommentAsync(int id, AddCommentsDto addCommentsDto);
    }
}
