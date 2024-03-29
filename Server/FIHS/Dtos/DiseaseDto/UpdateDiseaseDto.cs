﻿using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.DiseaseDto
{
    public class UpdateDiseaseDto
    {
        [StringLength(50)]
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
        [StringLength(128)]
        public string? Description { get; set; }
        [StringLength(128)]
        public string? Treatments { get; set; }
        [StringLength(128)]
        public string? Symptoms { get; set; }
        [StringLength(128)]
        public string? PreventionMethods { get; set; }
    }
}
