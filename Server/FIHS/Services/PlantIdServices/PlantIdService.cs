using FIHS.Dtos.IdentificationDtos;
using FIHS.Models.PlantIdentification;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using FIHS.Interfaces.IPlantId;
using FIHS.Dtos.PlantIdDtos;
using Google.Apis.Translate.v2.Data;

namespace FIHS.Services.PlantIdServices
{
    public class PlantIdService : IPlantIdService
    {
        const string API_URL = "https://plant.id/api/v2/";
        const string LANGUAGE = "ar";
        private readonly List<string> PlantDetails = new() { "common_names", "url", "wiki_description", "taxonomy", "wiki_image" };
        private readonly List<string> DiseaseDetails = new() { "description", "url", "treatment", "common_names", "classification" };
        private readonly IConfiguration _configuration;
        public PlantIdService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public PlantIdentificationDto Identify(IFormFile imageFile)
        {
            string API_KEY = _configuration["ApiKeys:PlantId"];

            var imgBased64 = Base64EncodeFromFormFile(imageFile);

            var client = new RestClient(API_URL + "identify");
            var request = new RestRequest(Method.POST);

            request.AddHeader("Api-Key", API_KEY);

            var requestBody = new
            {
                plant_details = PlantDetails,
                plant_language = LANGUAGE,
                images = new List<string> { imgBased64 }
            };

            var jsonBody = JsonConvert.SerializeObject(requestBody);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);

            IRestResponse response = client.Execute(request);

            if (!response.IsSuccessful)
                return new PlantIdentificationDto { Succeeded = false, Message = "حدث خطأ ما" };

            var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<PlantIdentificationResponse>();

            if (content == null)
                return new PlantIdentificationDto { Succeeded = false, Message = "حدث خطأ ما" };


            if (!content.Is_plant)
                return new PlantIdentificationDto { Succeeded = false, Message = "ليس نباتا" };

            var plantDetails = content.Suggestions?[0].Plant_details ?? null;

            var plant = new PlantIdentificationDto
            {
                Name = plantDetails?.Common_names?[0],
                ScientificName = plantDetails?.Scientific_name,
                Description = plantDetails?.Wiki_description?.Value,
                ImageUrl = plantDetails?.Wiki_image?.Value,
                WikiUrl = plantDetails?.Wiki_description?.citation,
                Taxonomy = plantDetails?.Taxonomy,
                Succeeded = true
            };

            return plant;
        }
        public HealthAssessmentDto DetectDisease(IFormFile imageFile)
        {
            string API_KEY = _configuration["ApiKeys:PlantId"];

            var imgBased64 = Base64EncodeFromFormFile(imageFile);

            var client = new RestClient(API_URL + "health_assessment");
            var request = new RestRequest(Method.POST);

            request.AddHeader("Api-Key", API_KEY);

            var requestBody = new
            {
                disease_details = DiseaseDetails,
                language = LANGUAGE,
                images = new List<string> { imgBased64 }
            };

            var jsonBody = JsonConvert.SerializeObject(requestBody);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);

            IRestResponse response = client.Execute(request);

            if (!response.IsSuccessful)
                return new HealthAssessmentDto { Succeeded = false, Message = "حدث خطأ ما" };

            var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<HealthAssessmentResponse>();

            if (content == null)
                return new HealthAssessmentDto { Succeeded = false, Message = "حدث خطأ ما" };

            if (!content.Is_plant)
                return new HealthAssessmentDto { Succeeded = false, Message = "ليس نباتا" };

            var predictedDisease = content.Health_assessment.Diseases?[0];
            var diseaseDetails = predictedDisease?.Disease_details;

            var disease = new HealthAssessmentDto
            {
                Name = diseaseDetails?.Local_name,
                ScientificName = predictedDisease?.Name,
                Url = diseaseDetails?.Url,
                Description = diseaseDetails?.Description,
                Treatment = diseaseDetails?.Treatment,
                Classification = diseaseDetails?.Classification,
                IsHealthy = content.Health_assessment.Is_healthy,
                Succeeded = true
            };

            return disease;
        }
        private static string Base64EncodeFromFormFile(IFormFile file)
        {
            using MemoryStream ms = new();
            file.CopyTo(ms);
            byte[] fileBytes = ms.ToArray();
            return Convert.ToBase64String(fileBytes);
        }
    }
}
