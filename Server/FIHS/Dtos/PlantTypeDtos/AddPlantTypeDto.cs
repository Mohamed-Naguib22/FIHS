using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.PlantTypeDtos
{
    public class AddPlantTypeDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; }
        [Required, MaxLength(100)]
        public string HeightRange { get; set; }
        [Required, MaxLength(100)]
        public string SpreadRange { get; set; }
        [Required, MaxLength(100)]
        public string LifeCycle { get; set; }
        public IFormFile Image { get; set; }
    }
}
