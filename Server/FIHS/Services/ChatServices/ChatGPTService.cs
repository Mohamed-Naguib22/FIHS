﻿using FIHS.Models;
using OpenAI_API.Completions;
using OpenAI_API;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FIHS.Models.ChatGPT;
using ChatGPT.Net;
using FIHS.Interfaces.IChat;

namespace FIHS.Services.ChatServices
{
    public class ChatGPTService : IChatGPTService
    {
        private readonly IConfiguration _configuration;
        public ChatGPTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<AnswerModel> AskQuestionAsync(QuestionModel model)
        {
            try
            {
                var apiKey = _configuration["ApiKeys:ChatGPT"];

                if (apiKey == null)
                    return new AnswerModel { StatusCode = 400, Message = "API key for ChatGPT is missing or invalid." };

                var openAi = new ChatGpt(apiKey);
                var answer = await openAi.Ask(model.Question);

                return new AnswerModel { Answer = answer };
            }
            catch
            {
                return new AnswerModel { StatusCode = 503, Message = "غير متوفرة Chat GPT خدمة" };

            }
        }
    }
}
