using AutoMapper;
using FIHS.Dtos.CommentDtos;
using FIHS.Interfaces.IComment;
using FIHS.Interfaces.IDisease;
using FIHS.Interfaces.IPest;
using FIHS.Interfaces.IPlant;
using FIHS.Interfaces.IUser;
using FIHS.Models.CommentModels;

namespace FIHS.Services.CommentServices
{
    public class CommentServices : ICommentServices
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly IPlantRepository _plantRepository;
        private readonly IUserService _userService;
        private readonly IPestService _pestService;
        private readonly IDiseaseService _diseaseService;

        public CommentServices(ICommentRepository commentRepository, IMapper mapper, IPlantRepository plantRepository, IUserService userService, IPestService pestService, IDiseaseService diseaseService)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _plantRepository = plantRepository;
            _userService = userService;
            _pestService = pestService;
            _diseaseService = diseaseService;
        }

        public async Task<bool> AddCommentAsync(AddCommentsDto addCommentsDto)
        {
            var userId = await _userService.GetUserIdByToken(addCommentsDto.refreshToken);
            if (userId == null)
                return false;
            if(await _commentRepository.HasReachedCommentsLimits(userId,addCommentsDto.EntityType,addCommentsDto.EntityId))
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

        public bool EditCommentAsync(int id,AddCommentsDto addCommentsDto)
        {
            if (id != addCommentsDto.Id)
                return false;
            var userId = _userService.GetUserIdByToken(addCommentsDto.refreshToken).Result;
            if (userId == null)
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
            return _mapper.Map<IEnumerable<GetAllCommentsDto>>(await _commentRepository.GetAllComments(entityId, entityType));
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
                case "disease":
                    if(await _diseaseService.IsDiseaseExist(entityId))
                    {
                        return true;
                    }
                    break;
                case "pest":
                    if(await _pestService.IsPestExist(entityId))
                    {
                        return true;
                    }
                    break;
            }
            return false;
        }
    }
}
