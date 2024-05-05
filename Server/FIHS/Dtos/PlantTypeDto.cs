
using System.Text.Json.Serialization;

namespace FIHS.Dtos
{
    public class PlantTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HeightRange { get; set; }
        public string SpreadRange { get; set; }
        public string ImgURL { get; set; }
        public string LifeCycle { get; set; }
    }
}
