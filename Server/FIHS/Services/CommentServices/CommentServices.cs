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

        public async Task<string> AddCommentAsync(AddCommentsDto addCommentsDto)
        {
            var userId = await _userService.GetUserIdByToken(addCommentsDto.refreshToken);
            var result = await HandleDataForComment(userId, addCommentsDto);
            if (string.IsNullOrEmpty(result))
            {
                var comment = _mapper.Map<Comment>(addCommentsDto);
                comment.UserId = userId;
                await _commentRepository.AddComment(comment);
            }
            return result;
        }

        public async Task<bool> DeleteCommentAsync(int commentId)
        { 
            var comment=await _commentRepository.FindCommentById(commentId);
            if (comment==null)
                return false;
            _commentRepository.DeleteComment(comment);
            return true;
        }

        public async Task<string> EditCommentAsync(int id,AddCommentsDto addCommentsDto)
        {
            if (id != addCommentsDto.Id)
                return "Id sent in body doesn't match the Id sent in URL";
            if (!await _commentRepository.IsCommentExist(addCommentsDto.Id))
                return "لم يتم العثور علي اي تعليق";
            var userId = _userService.GetUserIdByToken(addCommentsDto.refreshToken).Result;
            if (userId == null)
                return "لم يتم العثور علي اي مستخدم";
            var comment = _mapper.Map<Comment>(addCommentsDto);
            comment.UserId = userId;
            _commentRepository.EditComment(comment);
            return string.Empty;
        }

        public async Task<IEnumerable<GetAllCommentsDto>> GetAllEntityComments(int entityId, string entityType)
        {
            return _mapper.Map<IEnumerable<GetAllCommentsDto>>(await _commentRepository.GetAllComments(entityId, entityType));
        } 
        private async Task<string> HandleDataForComment(string userId,AddCommentsDto commentsDto)
        {
            if (userId == null)
                return "لم يتم العثور علي اي مستخدم";
            if (await _commentRepository.HasReachedCommentsLimits(userId, commentsDto.EntityType, commentsDto.EntityId))
                return "لقد تجاوزت الحد المسموح من التعليقات";
            switch (commentsDto.EntityType.ToLower())
            {
                case "plant":
                    if (!_plantRepository.IsPlantExist(commentsDto.EntityId))
                        return "لم يتم العثور علي اي نبات";
                    break;
                case "disease":
                    if(!await _diseaseService.IsDiseaseExist(commentsDto.EntityId))
                        return "لم يتم العثور علي اي مرض";
                    break;
                case "pest":
                    if(!await _pestService.IsPestExist(commentsDto.EntityId))
                        return "لم يتم العثور علي اي افه";
                    break;
                default:
                       return "لم يتم العثور علي هذا الكيان";
            }
            return string.Empty;
        }
    }
}
