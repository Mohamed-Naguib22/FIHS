using FIHS.Dtos.IdentificationDtos;
using FIHS.Models.PlantIdentification;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using FIHS.Interfaces.IPlantId;
using FIHS.Dtos.PlantIdDtos;

namespace FIHS.Services.PlantIdServices
{
    public class PlantIdService : IPlantIdService
    {
        private readonly string _apiKey;
        public PlantIdService(IConfiguration configuration)
        {
            _apiKey = configuration["ApiKeys:PlantId"];
        }

        public async Task<PlantIdentificationDto> IdentifyPlantAsync(IFormFile imageFile)
        {
            var imgBased64 = ConvertToBase64Image(imageFile);
            var requestBody = new PlantIdentificationRequest(imgBased64);

            var content = await ExecuteRequestAsync<PlantIdentificationResponse>("identify", requestBody);

            if (content == null)
                return new PlantIdentificationDto { Succeeded = false, Message = $"Error Identifing the plant" };

            if (!content.Is_plant)
                return new PlantIdentificationDto { Succeeded = false, Message = "الرجاء ادخال صورة نبات" };

            var suggestions = MapPlantSuggestionsToDto(content);

            return new PlantIdentificationDto { Succeeded = true, Suggestions = suggestions };
        }

        public async Task<HealthAssessmentDto> DetectDiseaseAsync(IFormFile imageFile)
        {
            var imgBased64 = ConvertToBase64Image(imageFile);
            var requestBody = new HealthAssessmentRequest(imgBased64);

            var content = await ExecuteRequestAsync<HealthAssessmentResponse>("health_assessment", requestBody);

            if (content == null)
                return new HealthAssessmentDto { Succeeded = false, Message = $"Error detecting the disease" };

            if (!content.Is_plant)
                return new HealthAssessmentDto { Succeeded = false, Message = "الرجاء ادخال صورة نبات" };

            var suggestions = MapDiseaseSuggestionsToDto(content);

            return new HealthAssessmentDto
            {
                IsPlant = content.Is_plant,
                IsHealthy = content.Health_assessment.Is_healthy,
                Suggestions = suggestions,
                Succeeded = true
            };
        }

        private static string ConvertToBase64Image(IFormFile file)
        {
            using MemoryStream ms = new();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();
            return Convert.ToBase64String(fileBytes);
        }

        private async Task<T> ExecuteRequestAsync<T>(string endnpoint, object requestBody)
        {
            var client = new RestClient("https://plant.id/api/v2/" + endnpoint);
            var request = new RestRequest(Method.POST);
            var jsonBody = JsonConvert.SerializeObject(requestBody);

            request.AddHeader("Api-Key", _apiKey);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
            var response = await client.ExecuteAsync(request);
            var content = JsonConvert.DeserializeObject<JToken>(response.Content).ToObject<T>();

            if (content == null)
                return default;

            return content;
        }

        private static List<SuggestionDto>? MapPlantSuggestionsToDto(PlantIdentificationResponse content)
        {
            return content.Suggestions.Take(3)
                ?.Select(suggestion => new SuggestionDto
                {
                    CommonNames = suggestion.Plant_details?.Common_names,
                    Probability = suggestion.Probability,
                    Confirmed = suggestion.Confirmed,
                    ScientificName = suggestion.Plant_details?.Scientific_name,
                    Description = suggestion.Plant_details?.Wiki_description?.Value,
                    ImageUrl = suggestion.Plant_details?.Wiki_image?.Value,
                    WikiUrl = suggestion.Plant_details?.Wiki_description?.citation,
                }).ToList();
        }

        private static List<DiseaseSuggestion>? MapDiseaseSuggestionsToDto(HealthAssessmentResponse content)
        {
            return content.Health_assessment.Diseases?.Take(3)
                ?.Select(suggestion => new DiseaseSuggestion
                {
                    Name = suggestion.Disease_details?.Local_name,
                    Probability = suggestion.Probability,
                    ScientificName = suggestion.Name,
                    Description = suggestion.Disease_details?.Description,
                    Treatment = suggestion.Disease_details?.Treatment,
                    Classification = suggestion.Disease_details?.Classification,
                }).ToList();
        }
    }
}