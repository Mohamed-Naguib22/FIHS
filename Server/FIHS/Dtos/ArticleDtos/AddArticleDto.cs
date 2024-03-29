﻿using FIHS.Models;
using System.ComponentModel.DataAnnotations;

namespace FIHS.Dtos.ArticleDtos
{
    public class AddArticleDto
    {
        [StringLength(128)]
        public string Title { get; set; }
        [StringLength(500)]
        public string Overview { get; set; }
        [StringLength(128)]
        public string Author { get; set; }
        public DateTime PublicationDate { get; set; }
        public IFormFile Image { get; set; }
    }
}
