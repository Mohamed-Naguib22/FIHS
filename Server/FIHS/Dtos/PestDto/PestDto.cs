using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.PestDto
{
    public class PestDto
    {
        
        [Required,StringLength(50)]
        public string Species { get; set; }
        [Required,StringLength(50)]
        public string Name { get; set; }
        [Required, StringLength(128)]
        public string ScientificName { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required,StringLength(128)]
        public string DamageSymptoms { get; set; }
        [Required, StringLength(128)]
        public string ControlMethods { get; set; }
        [Required, StringLength(128)]
        public string Description { get; set; }
        [Required, StringLength(128)]
        public string LifeCycle { get; set; }
        [Required, StringLength(50)]
        public string GeographicDistribution { get; set; }
        [Required, StringLength(128)]
        public string Reproduction { get; set; }
    }
}
