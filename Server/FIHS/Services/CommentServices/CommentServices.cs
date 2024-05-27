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
            int?[] ids=new int?[] {addCommentsDto.PlantId,addCommentsDto.DiseaseId,addCommentsDto.PestId};
            if (ids.All(c=>c==null)||ids.Count(i => i != null) !=1)
                return "EntityId is Required";
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
            if (!await _commentRepository.IsCommentExist(id))
                return "لم يتم العثور علي اي تعليق";
            if (!await IsEntityExist(addCommentsDto))
                return "No entity is found";
            var comment = _mapper.Map<Comment>(addCommentsDto);
            _commentRepository.EditComment(comment);
            return string.Empty;
        }

        public IEnumerable<GetAllCommentsDto> GetAllEntityComments(int entityId, string entityType)
        {
            IEnumerable<Comment> comments=Enumerable.Empty<Comment>();
            switch (entityType.ToLower())
            {
                case "plant":
                    comments= _commentRepository.GetAllComments(c=>c.PlantId==entityId);
                    break;
                case "disease":
                    comments= _commentRepository.GetAllComments(c=>c.DiseaseId==entityId);
                    break;
                case "pest":
                    comments= _commentRepository.GetAllComments(c=>c.PestId==entityId);
                    break;
            }
            return _mapper.Map<IEnumerable<GetAllCommentsDto>>(comments);
        } 
        private async Task<string> HandleDataForComment(string userId,AddCommentsDto commentsDto)
        {
            if (userId == null)
                return "لم يتم العثور علي اي مستخدم";
            if (!await IsEntityExist(commentsDto))
                return "No entity is found";
            switch (commentsDto.EntityType.ToLower())
            {
                case "plant":
                    if (_commentRepository.HasReachedCommentsLimits(c => c.PlantId == commentsDto.PlantId && c.UserId == userId))
                        return "لقد تجاوزت الحد المسموح من التعليقات";
                    break;
                case "disease":
                    if (_commentRepository.HasReachedCommentsLimits(c => c.DiseaseId == commentsDto.DiseaseId && c.UserId == userId))
                        return "لقد تجاوزت الحد المسموح من التعليقات";
                    break;
                case "pest":
                    if (_commentRepository.HasReachedCommentsLimits(c => c.PestId == commentsDto.PestId && c.UserId == userId))
                        return "لقد تجاوزت الحد المسموح من التعليقات";
                    break;
            }
            return string.Empty;
        }
        private async Task<bool> IsEntityExist(AddCommentsDto commentsDto)
        {
            switch (commentsDto.EntityType.ToLower())
            {
                case "plant":
                   return _plantRepository.IsPlantExist((int)commentsDto.PlantId);
                case "disease":
                     return await _diseaseService.IsDiseaseExist((int)commentsDto.DiseaseId);
                case "pest":
                    return await _pestService.IsPestExist((int)commentsDto.PestId);
            }
            return false;
        }
    }
}
