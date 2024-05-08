using FIHS.Dtos.CommentDtos;
using FIHS.Interfaces.IComment;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentServices _commentServices;
        public CommentController(ICommentServices commentServices)
        {
            _commentServices = commentServices;
        }
        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody]AddCommentsDto addCommentsDto)
        {
            addCommentsDto.refreshToken = GetRefreshToken();
            if (addCommentsDto.refreshToken == null ) return NotFound("لم يتم العثور علي اي مستخدم");
            var result =  await _commentServices.AddCommentAsync(addCommentsDto);
            return string.IsNullOrEmpty(result) ? Ok("تمت اضافة التعليق بنجاح") : BadRequest(result);
        }
        [HttpGet("GetAllComments")]
        public async Task<IActionResult> GetAllComments(int entityId, string entityType)
        {
            var result = await _commentServices.GetAllEntityComments(entityId, entityType);
            return Ok(result);
        }
        [HttpPut("EditComment/{Id}")]
        public async Task<IActionResult> EditComment([FromBody]AddCommentsDto commentDto, int Id)
        {
            commentDto.refreshToken = GetRefreshToken();
            if (commentDto.refreshToken == null) return NotFound("لم يتم العثور علي اي مستخدم");
            var result =await _commentServices.EditCommentAsync(Id,commentDto);
            return string.IsNullOrEmpty(result) ? Ok("تم تعديل التعليق بنجاح"):BadRequest(result);
        }
        [HttpDelete("DeleteComment/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
           var result= await _commentServices.DeleteCommentAsync(id);
           return result? Ok("تم حذف التعليق بنجاح") : NotFound("لم يتم العثور علي اي تعليق");
        }
        private string GetRefreshToken()
        {
            return Request.Cookies["refreshToken"];
        }
    }
}
