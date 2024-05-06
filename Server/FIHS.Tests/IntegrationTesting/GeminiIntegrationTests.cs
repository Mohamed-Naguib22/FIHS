using Azure;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;
using System.Net;
using Xunit;

namespace FIHS.Tests.IntegrationTesting
{
    public class GeminiIntegrationTests
    {
        private readonly string API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
        private readonly string _apiKey;
        private readonly IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();
        public GeminiIntegrationTests()
        {
            _apiKey = configuration.GetSection("ApiKeys:Gemini").Value;
        }

        [Fact]
        public async Task AskQuestionAsync_ValidApiKey_ReturnSuccessAndAnswerForValidQuestion()
        {
            var body = new
            {
                contents = new[]
                {
                    new { parts = new[] { new { text = "How are you?" } } }
                }
            };

            var client = new RestClient(API_URL + _apiKey);
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(body);

            var response = await client.ExecuteAsync<Dictionary<string, object>>(request);

            dynamic responseObject = JsonConvert.DeserializeObject(response.Content);

            string answer = responseObject.candidates[0].content.parts[0].text;

            Assert.True(response.IsSuccessful);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(answer);
        }

        [Fact]
        public async Task AskQuestionAsync_MissingApiKey_ReturnsForbidden()
        {
            var client = new RestClient(API_URL);
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");

            var response = await client.ExecuteAsync(request);

            Assert.False(response.IsSuccessful);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }
    }
}