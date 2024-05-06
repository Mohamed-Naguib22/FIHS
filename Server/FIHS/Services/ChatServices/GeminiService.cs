using FIHS.Interfaces.IChat;
using FIHS.Models.ChatGPT;
using FIHS.Models.GeminiModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace FIHS.Services.ChatServices
{
    public class GeminiService : IChatbotService
    {
        private readonly string _apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
        private readonly string _apiKey;
        public GeminiService(IConfiguration configuration)
        {
            _apiKey = configuration["ApiKeys:Gemini"];
        }
        public async Task<AnswerModel> AskQuestionAsync(QuestionModel model)
        {
            var body = new{contents = new[]{new {parts = new[]{new {text = model.Question}}}}};

            var client = new RestClient(_apiUrl + _apiKey);

            var request = new RestRequest(Method.POST);
            request.AddJsonBody(body);
            
            var response = await client.ExecuteAsync(request);

            if (!response.IsSuccessful)
                return new AnswerModel { Succeeded = false, Message = "غير متوفرة الرجاء المحاولة لاحقا Gemini خدمة", StatusCode = 503 };

            var content = JsonConvert.DeserializeObject<JToken>(response.Content).ToObject<GeminiApiResponse>();
            
            if (content.Candidates[0].FinishReason != "STOP")
                return new AnswerModel { Succeeded = false, Message = "الرجاء ادخال سؤال صالح", StatusCode = 400 };

            string answer = content.Candidates[0].Content.Parts[0].Text;

            return new AnswerModel { Succeeded = true, Answer = answer, StatusCode = 200 };
        }
    }
}
