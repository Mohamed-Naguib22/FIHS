using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FIHS.Dtos.DiseaseDto
{
    public class ReturnDiseaseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Treatments { get; set; }
        public string Symptoms { get; set; }
        public string PreventionMethods { get; set; }
        [JsonIgnore]
        public string Message { get; set; }
    }
}
