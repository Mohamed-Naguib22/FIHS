﻿using System.ComponentModel.DataAnnotations;

namespace FIHS.Models.Pesticide
{
    public class Pesticide
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public double? Price { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }
        public string? Manufactuer { get; set; }
        [MaxLength(800)]
        public string? UsageInstructions { get; set; }
        public string? Toxicity { get; set; }
        public string? Type { get; set; }
        public string? ImageURL { get; set; }

    }

}

    