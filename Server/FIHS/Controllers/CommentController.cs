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
        public async Task<IActionResult> AddComment([FromQuery]AddCommentsDto addCommentsDto)
        {
            addCommentsDto.refreshToken = GetRefreshToken();
            if ( addCommentsDto.refreshToken == null ) return BadRequest("حدث خطأ ما");
            var result =   await _commentServices.AddCommentAsync(addCommentsDto);
            return result ? Ok("تمت اضافة التعليق بنجاح") : BadRequest("حدث خطأ ما");
        }
        [HttpGet("GetAllComments")]
        public async Task<IActionResult> GetAllComments( int entityId, string entityType)
        {
            var result = await _commentServices.GetAllEntityComments(entityId, entityType);
            return Ok(result);
        }
        [HttpPut("EditComment/{Id}")]
        public async Task<IActionResult> EditComment([FromBody]AddCommentsDto commentDto, int Id)
        {
            commentDto.refreshToken = GetRefreshToken();
            if (commentDto.refreshToken == null) return BadRequest("حدث خطأ ما");
            var result = _commentServices.EditCommentAsync(Id,commentDto);
            return result? Ok("تم تعديل التعليق بنجاح"):BadRequest("حدث خطأ ما");
        }
        [HttpDelete("DeleteComment/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            await _commentServices.DeleteCommentAsync(id);
            return Ok("تم حذف التعليق بنجاح");
        }
        private string GetRefreshToken()
        {
            return Request.Cookies["refreshToken"];
        }
    }
}
