using FIHS.Dtos.CommentDtos;

namespace FIHS.Interfaces.IComment
{
    public interface ICommentServices
    {
        public Task<bool> AddCommentAsync(AddCommentsDto addCommentsDto);
        public Task DeleteCommentAsync(int commentId);
        public Task<IEnumerable<GetAllCommentsDto>> GetAllEntityComments(int entityId, string entityType);
        public bool EditCommentAsync(AddCommentsDto addCommentsDto);
    }
}
