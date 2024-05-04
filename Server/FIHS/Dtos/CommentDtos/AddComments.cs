namespace FIHS.Dtos.CommentDtos
{
    public class AddCommentsDto
    {
        public int Id { get; set; }
        public string EntityType { get; set; }
        public int EntityId { get; set; }
        public string UserId {  get; set; }
        public string CommentBody { get; set; }
    }
}
