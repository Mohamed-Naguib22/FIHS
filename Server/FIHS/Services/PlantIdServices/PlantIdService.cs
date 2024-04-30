using FIHS.Dtos.IdentificationDtos;
using FIHS.Models.PlantIdentification;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using FIHS.Interfaces.IPlantId;
using FIHS.Dtos.PlantIdDtos;
using FIHS.Models.ArticleModels;
using FIHS.Dtos.ArticleDtos;

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
        public async Task<PlantIdentificationDto> IdentifyPlantAsync(IFormFile imageFile)
        {
            var apiKey = _configuration["ApiKeys:PlantId"];
            
            if (apiKey == null)
                return new PlantIdentificationDto { Message = "API key required", Succeeded = false };

            var imgBased64 = Base64EncodeFromFormFile(imageFile);

            var client = new RestClient(API_URL + "identify");
            var request = new RestRequest(Method.POST);

            request.AddHeader("Api-Key", apiKey);

            var requestBody = new
            {
                plant_details = PlantDetails,
                plant_language = LANGUAGE,
                images = new List<string> { imgBased64 }
            };

            var jsonBody = JsonConvert.SerializeObject(requestBody);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
            
            try
            {
                var response = await client.ExecuteAsync(request);

                if (!response.IsSuccessful)
                    return new PlantIdentificationDto { Message = $"Error Identifing the plant: {response.StatusCode}", Succeeded = false };

                var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<PlantIdentificationResponse>();

                if (content == null)
                    return new PlantIdentificationDto { Message = "JSON Serialization Error", Succeeded = false };

                if (!content.Is_plant)
                    return new PlantIdentificationDto { Succeeded = false, Message = "الرجاء ادخال صورة نبات" };

                var suggestions = content.Suggestions.Take(3)
                    ?.Select(suggestion => new SuggestionDto
                    {
                        CommonNames = suggestion.Plant_details?.Common_names,
                        Probability = suggestion.Probability,
                        Confirmed = suggestion.Confirmed,
                        ScientificName = suggestion.Plant_details?.Scientific_name,
                        Description = suggestion.Plant_details?.Wiki_description?.Value,
                        ImageUrl = suggestion.Plant_details?.Wiki_image?.Value,
                        WikiUrl = suggestion.Plant_details?.Wiki_description?.citation,
                        Taxonomy = suggestion.Plant_details?.Taxonomy,
                    }).ToList();

                return new PlantIdentificationDto { Succeeded = true, Suggestions = suggestions };
            }
            catch (HttpRequestException ex)
            {
                return new PlantIdentificationDto { Message = $"Error Identifing the plant: {ex.Message}", Succeeded = false };
            }
            catch (JsonSerializationException ex)
            {
                return new PlantIdentificationDto { Message = $"JSON Serialization Error: {ex.Message}", Succeeded = false };
            }
        }

        public async Task<HealthAssessmentDto> DetectDiseaseAsync(IFormFile imageFile)
        {
            var API_KEY = _configuration["ApiKeys:PlantId"];

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
            
            try
            {
                var response = await client.ExecuteAsync(request);

                if (!response.IsSuccessful)
                    return new HealthAssessmentDto { Message = $"Error detecting the disease: {response.StatusCode}", Succeeded = false };

                var content = JsonConvert.DeserializeObject<JToken>(response.Content)?.ToObject<HealthAssessmentResponse>();

                if (content == null)
                    return new HealthAssessmentDto { Message = "JSON Serialization Error", Succeeded = false };

                if (!content.Is_plant)
                    return new HealthAssessmentDto { Succeeded = false, Message = "الرجاء ادخال صورة نبات" };

                var suggestions = content.Health_assessment.Diseases?.Take(3)
                    ?.Select(suggestion => new DiseaseSuggestion
                    {
                        Name = suggestion.Disease_details?.Local_name,
                        Probability = suggestion.Probability,
                        ScientificName = suggestion.Name,
                        Description = suggestion.Disease_details?.Description,
                        Treatment = suggestion.Disease_details?.Treatment,
                        Classification = suggestion.Disease_details?.Classification,
                    }).ToList();

                return new HealthAssessmentDto
                {
                    IsPlant = content.Is_plant,
                    IsHealthy = content.Health_assessment.Is_healthy,
                    Suggestions = suggestions,
                    Succeeded = true
                };
            }
            catch (HttpRequestException ex)
            {
                return new HealthAssessmentDto { Message = $"Error detecting the disease: {ex.Message}", Succeeded = false };
            }
            catch (JsonSerializationException ex)
            {
                return new HealthAssessmentDto { Message = $"JSON Serialization Error: {ex.Message}", Succeeded = false };
            }
        }
        private static string Base64EncodeFromFormFile(IFormFile file)
        {
            using MemoryStream ms = new();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();
            return Convert.ToBase64String(fileBytes);
        }
    }
}