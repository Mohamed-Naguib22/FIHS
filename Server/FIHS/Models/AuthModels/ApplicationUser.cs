using FIHS.Models.ArticleModels;
using FIHS.Models.FavouriteModels;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.AuthModels
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(256), DataType(DataType.ImageUrl)]
        public string? ImgUrl { get; set; }
        public List<RefreshToken>? RefreshTokens { get; set; }
        public IEnumerable<ArticleLike> ArticleLikes { get; set; }
        public Favourite Favourite { get; set; }
    }
}
