using FHIS.Services;
using FIHS.Helpers;
using FIHS.Interfaces;
using FIHS.Interfaces.IArticle;
using FIHS.Interfaces.IChat;
using FIHS.Interfaces.IDisease;
using FIHS.Interfaces.IFertilizer;
using FIHS.Interfaces.IPest;
using FIHS.Interfaces.IPesticide;
using FIHS.Interfaces.IPlant;
using FIHS.Interfaces.IPlantId;
using FIHS.Interfaces.IPlantType;
using FIHS.Interfaces.IUser;
using FIHS.Interfaces.IWeather;
using FIHS.Models.AuthModels;
using FIHS.Models.Plant;
using FIHS.Services;
using FIHS.Services.ArticleService;
using FIHS.Services.ArticleServices;
using FIHS.Services.ChatServices;
using FIHS.Services.DiseaseService;
using FIHS.Services.FertilizerService;
using FIHS.Services.PesticideService;
using FIHS.Services.PestService;
using FIHS.Services.PlantIdServices;
using FIHS.Services.PlantservicesImp;
using FIHS.Services.PlantTypeServices;
using FIHS.Services.UserServices;
using FIHS.Services.WeatherServices;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.Configure<Sender>(builder.Configuration.GetSection("Sender"));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>
    (options => {
        options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultProvider;
        options.SignIn.RequireConfirmedAccount = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IChatGPTService, ChatGPTService>();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddScoped<IPlantIdService, PlantIdService>();
builder.Services.AddScoped<IArticleService, ArticleService>();
builder.Services.AddScoped<IArticleInteractionService, ArticleInteractionService>();
builder.Services.AddScoped<IPlantRepository, PlantRepository>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.AddScoped<IPesticide, PesticideService>();
builder.Services.AddScoped<IFertilizer, FertilizerService>();
builder.Services.AddScoped<IPestService, PestService>();
builder.Services.AddScoped<IDiseaseService, DiseaseService>();
builder.Services.AddScoped<IPlantType, PlantTypeServices>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
        ClockSkew = TimeSpan.Zero
    };
});
//AddFacebook(options =>
//{
//    options.AppId = "3012531528881382";
//    options.AppSecret = "0e6e6b85744d6255aaafa794c624a100";
//});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

//builder.Services.Configure<KestrelServerOptions>(options =>
//{
//    options.Listen(IPAddress.Loopback, 7184);
//    options.Listen(IPAddress.Parse(builder.Configuration["IPAddress"]), 7184);
//});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "FIHS", Version = "v1" });

});

builder.Services.AddMemoryCache();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
