using FIHS.Interfaces.IChat;
using FIHS.Models.ChatGPT;
using Newtonsoft.Json;
using RestSharp;

namespace FIHS.Services.ChatServices
{
    public class GeminiService : IChatbotService
    {
        private readonly IConfiguration _configuration;
        private const string API_UEL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
        public GeminiService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<AnswerModel> AskQuestionAsync(QuestionModel model)
        {
            var apiKey = _configuration["ApiKeys:Gemini"];

            if (apiKey == null)
                return new AnswerModel { StatusCode = 400, Message = "API key for ChatGPT is missing or invalid.", Succeeded = false };

            var body = new
            {
                contents = new[]
                {
                    new { parts = new[] { new { text = model.Question } } }
                }
            };

            var client = new RestClient(API_UEL + apiKey);
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(body);
            
            try
            {
                var response = await client.ExecuteAsync<Dictionary<string, object>>(request);

                if (!response.IsSuccessful)
                    return new AnswerModel { Succeeded = false, Answer = $"API Error: {response.StatusCode}", StatusCode = 503 };

                try
                {
                    dynamic responseObject = JsonConvert.DeserializeObject(response.Content);

                    string answer = responseObject.candidates[0].content.parts[0].text;

                    return new AnswerModel { Succeeded = true, Answer = answer };
                }

                catch
                {
                    return new AnswerModel { Succeeded = false, Answer = "Error parsing API response", StatusCode = 500 };
                }
            }

            catch
            {
                return new AnswerModel { Succeeded = false, StatusCode = 503,  Message = "Gemini service is unavailable"};
            }
        }
    }
}
