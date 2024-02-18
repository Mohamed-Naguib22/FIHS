using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.PestDto
{
    public class UpdatePestDto
    {
        [StringLength(50)]
        public string? Species { get; set; }
        [StringLength(50)]
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
        [StringLength(128)]
        public string? DamageSymptoms { get; set; }
        [StringLength(128)]
        public string? ControlMethods { get; set; }
        [StringLength(128)]
        public string? Description { get; set; }
        [StringLength(128)]
        public string? LifeCycle { get; set; }
        [StringLength(50)]
        public string? GeographicDistribution { get; set; }
        [StringLength(128)]
        public string? Reproduction { get; set; }
    }
}
