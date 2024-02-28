using FIHS.Models.AuthModels;

namespace FIHS.Models.FavouriteModels
{
    public class Favourite
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
