﻿//using AutoMapper;
//using FIHS.Dtos.CommentDtos;
//using FIHS.Interfaces.IComment;
//using FIHS.Interfaces.IPlant;
//using FIHS.Interfaces.IUser;
//using FIHS.Models.CommentModels;
//using FIHS.Models.PlantModels;

//namespace FIHS.Services.CommentServices
//{
//    public class CommentServices : ICommentServices
//    {
//        private readonly ICommentRepository _commentRepository;
//        private readonly IMapper _mapper;
//        private readonly IPlantRepository _plantRepository;
//        private readonly IUserService _userService;

//        public CommentServices(ICommentRepository commentRepository, IMapper mapper, IPlantRepository plantRepository, IUserService userService)
//        {
//            _commentRepository = commentRepository;
//            _mapper = mapper;
//            _plantRepository = plantRepository;
//            _userService = userService;
//        }

//        public async Task<bool> AddCommentAsync(AddCommentsDto addCommentsDto)
//        {
//            if (!await _userService.IsUserExist(addCommentsDto.UserId))
//                return false;
//            if (await HandleDataForComment(addCommentsDto.EntityId, addCommentsDto.EntityType)) {
//                var comment = _mapper.Map<Comment>(addCommentsDto);
//                await _commentRepository.AddComment(comment);
//                return true;
//                    }
//            return false;
//        }

//        public async Task DeleteCommentAsync(int commentId)
//        {
//            await _commentRepository.DeleteComment(commentId);
//        }

//        public async Task<IEnumerable<GetAllCommentsDto>> GetAllEntityComments(int entityId, string entityType)
//        {
//            if (await HandleDataForComment(entityId, entityType))
//            {
//                var commentsDto = _mapper.Map<IEnumerable<GetAllCommentsDto>>(await _commentRepository.GetAllComments(entityId, entityType));
//                return commentsDto;
//            }
//            return Enumerable.Empty<GetAllCommentsDto>();
//        } 
//        private async Task<bool> HandleDataForComment(int entityId, string entityType)
//        {
//            switch (entityType.ToLower())
//            {
//                case "plant":
//                    if (_plantRepository.IsPlantExist(entityId))
//                    {
//                        return true;
//                    }
//                    break;
//            }
//            return false;

//        }
//    }
//}
