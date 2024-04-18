using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.DiseaseDto
{
    public class DiseaseDto
    {
        [Required, StringLength(50)]
        public string Species { get; set; }
        [Required,StringLength(50)]
        public string Name { get; set; }
        [Required, StringLength(128)]
        public string ScientificName { get; set; }
        [Required, StringLength(128)]
        public string Causes { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required,StringLength(128)]
        public string Description { get; set; }
        [Required, StringLength(128)]
        public string Treatments { get; set; }
        [Required, StringLength(128)]
        public string Symptoms { get; set; }
        [Required, StringLength(128)]
        public string PreventionMethods { get; set; }
    }
}
