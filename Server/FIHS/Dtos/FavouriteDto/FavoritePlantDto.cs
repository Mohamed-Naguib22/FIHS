using FIHS.Models.PlantModels;

namespace FIHS.Dtos.FavouriteDto
{
    public class FavoritePlantDto
    {
        public int PlantId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual PlantInFavDto Plant { get; set; }
    }
}
