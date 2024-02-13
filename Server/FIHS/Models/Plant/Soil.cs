using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.CodeAnalysis.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FIHS.Models.Plant
{
    public class Soil
    {
        public int Id { get; set; }
        [Required,MaxLength(124),MinLength(2)]
        public string Name { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string Texture { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string Structure { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string pHLevel { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string NutrientContent { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string OrganicMatter { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string MoistureRetention { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string Drainage { get; set; }
        [Required, MaxLength(124), MinLength(2)]
        public string CationExchangeCapacity { get; set; }
        [ValidateNever]
        public string ImgUrl { get; set; }
        [NotMapped]
        public FormFile ImageFile { get; set; }
        [ValidateNever, JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ICollection<PlantSoilTypes> Plants { get; set; }


    }
}
