using AutoMapper;
using FIHS.Dtos.CommentDtos;
using FIHS.Interfaces.IComment;
using FIHS.Interfaces.IPlant;
using FIHS.Interfaces.IUser;
using FIHS.Models.CommentModels;
using FIHS.Models.PlantModels;

namespace FIHS.Services.CommentServices
{
    public class CommentServices : ICommentServices
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly IPlantRepository _plantRepository;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public CommentServices(ICommentRepository commentRepository, IMapper mapper, IPlantRepository plantRepository, IUserService userService, ITokenService tokenService)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _plantRepository = plantRepository;
            _userService = userService;
            _tokenService = tokenService;
        }

        public async Task<bool> AddCommentAsync(AddCommentsDto addCommentsDto)
        {
            var userId = await _userService.GetUserIdByToken(addCommentsDto.refreshToken);
            if (userId != null)
                return false;
            if (await HandleDataForComment(addCommentsDto.EntityId, addCommentsDto.EntityType)) {
                var comment = _mapper.Map<Comment>(addCommentsDto);
                comment.UserId = userId;
                await _commentRepository.AddComment(comment);
                return true;
                    }
            return false;
        }

        public async Task DeleteCommentAsync(int commentId)
        {
            await _commentRepository.DeleteComment(commentId);
        }

        public bool EditCommentAsync(AddCommentsDto addCommentsDto)
        {
            var userId =  _userService.GetUserIdByToken(addCommentsDto.refreshToken).Result;
            if (userId != null)
                return false;
            var comment = _mapper.Map<Comment>(addCommentsDto);
            if (!_commentRepository.IsCommentExist(comment.Id))
                return false;
            comment.UserId = userId;
            _commentRepository.EditComment(comment);
            return true;
        }

        public async Task<IEnumerable<GetAllCommentsDto>> GetAllEntityComments(int entityId, string entityType)
        {
            if (await HandleDataForComment(entityId, entityType))
            {
                var commentsDto = _mapper.Map<IEnumerable<GetAllCommentsDto>>(await _commentRepository.GetAllComments(entityId, entityType));
                return commentsDto;
            }
            return Enumerable.Empty<GetAllCommentsDto>();
        } 
        private async Task<bool> HandleDataForComment(int entityId, string entityType)
        {
            switch (entityType.ToLower())
            {
                case "plant":
                    if (_plantRepository.IsPlantExist(entityId))
                    {
                        return true;
                    }
                    break;
            }
            return false;

        }
    }
}
