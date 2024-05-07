using AutoMapper;
using FIHS.Dtos;
using FIHS.Dtos.ArticleDtos;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.DiseaseDto;
using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PestDto;
using FIHS.Dtos.PesticideDto;
using FIHS.Dtos.UserDtos;
using FIHS.Models;
using FIHS.Models.ArticleModels;
using FIHS.Models.AuthModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.Fertilizer;
using FIHS.Models.PestModels;
using FIHS.Models.PesticideModels;
using FIHS.Models.PlantModels;
using Microsoft.Identity.Client;
using System.Configuration;
using FIHS.Dtos.Favourite;
using FIHS.Models.FavouriteModels;
using FIHS.Dtos.FavouriteDto;
using FIHS.Dtos.CommentDtos;
using FIHS.Models.CommentModels;

namespace FIHS.Helpers
{
    public class MappingProfile : Profile
    {
        IConfiguration configuration = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();
        private string _baseUrl;
        public MappingProfile() 
        {
            _baseUrl = configuration.GetSection("BaseUrl").Value;
            
            //User
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<RegisterModel, ApplicationUser>()
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => "\\images\\Default_User_Image.png"))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
            CreateMap<ApplicationUser, AuthModel>()
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => _baseUrl + src.ImgUrl));

            //Article
            CreateMap<AddArticleDto, Article>()
                .ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<Article, ReturnArticleDto>()
                .ForMember(dest => dest.NumOfLikes, opt => opt.MapFrom(src => src.ArticleLikes.Where(a => a.ArticleId == src.Id).Count()))
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => _baseUrl + src.ImgUrl))
                .ForMember(dest => dest.ArticleTags, opt => opt.MapFrom(src => src.ArticleTags.Select(at => at.Tag)));
            CreateMap<Article, ReturnArticlesDto>()
                .ForMember(dest => dest.NumOfLikes, opt => opt.MapFrom(src => src.ArticleLikes.Where(a => a.ArticleId == src.Id).Count()))
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => _baseUrl + src.ImgUrl));
            CreateMap<AddSectionDto, ArticleSection>();
            CreateMap<TagDto, ArticleTag>();

            // Plants&Soils
            CreateMap<Plant, PlantDto>()
                .ForMember(des => des.ImageUrl, opt => opt.MapFrom(src => configuration.GetSection("BaseUrl").Value + src.ImageUrl)).ReverseMap();
            CreateMap<PlantsTypesOfPlant, PlantTypeDto>().IncludeMembers(src=>src.PlantType).ReverseMap();
            CreateMap<PlantType, PlantTypeDto>().ForMember(dest => dest.ImgURL, opt => opt.MapFrom(src => _baseUrl + src.ImgURL)).ReverseMap();
            CreateMap<PlantSoilTypes, SoilDto>().IncludeMembers(src => src.Soil);
            CreateMap<Soil, SoilDto>();
            CreateMap<Plant, PlantInDto>().ForMember(des => des.ImageUrl, opt => opt.MapFrom(src => configuration.GetSection("BaseUrl").Value + src.ImageUrl)).ReverseMap();
            CreateMap<PlantsDiseases, PlantDto>().IncludeMembers(src => src.Plant).ReverseMap();
            CreateMap<PlantsDiseases, PlantInDto>().IncludeMembers(src => src.Plant).ReverseMap();
            CreateMap<PlantsPests, PlantDto>().IncludeMembers(src => src.Plant);
            CreateMap<PlantsPests, PlantInDto>().IncludeMembers(src => src.Plant);
            //Pest & Disease
            CreateMap<PlantsPests,ReturnPestDto>().IncludeMembers(src => src.Pest);
            CreateMap<PlantsDiseases, ReturnDiseaseDto>().IncludeMembers(src => src.Disease).ReverseMap();
            CreateMap<PestDto, Pest>().ForMember(p => p.ImageUrl, opt=>opt.Ignore());
            CreateMap<DiseaseDto, Disease>().ForMember(d => d.ImageUrl, opt => opt.Ignore());
            CreateMap<Disease, ReturnDiseaseDto>().ForMember(d => d.ImageUrl, opt => opt.MapFrom(d => _baseUrl + d.ImageUrl));
            CreateMap<Pest,ReturnPestDto>().ForMember(p => p.ImageUrl, opt => opt.MapFrom(p => _baseUrl + p.ImageUrl));
            /*mapping pesticide & fertilizer*/
            CreateMap<Pesticide, PesticideDto>().ReverseMap().ForMember(i => i.ImageURL, opt => opt.Ignore());
            CreateMap<Fertilizer, FertilizerDto>().ReverseMap().ForMember(i => i.ImageURL, opt => opt.Ignore());
            CreateMap<Pesticide, PesticideReturnDto>();
            CreateMap<Fertilizer, FertilizerReturnDto>();
            CreateMap<PestsPesticides, PesticideReturnDto>().IncludeMembers(src => src.Pesticide);
            CreateMap<Fertilizer, FertilizerPlantDto>().ForMember(dest => dest.ImageURL, opt => opt.MapFrom(src => _baseUrl + src.ImageURL));
            CreateMap<Fertilizer, IEnumerable<FertilizerReturnDto>>();
            CreateMap<Pesticide, IEnumerable<PesticideReturnDto>>();
            // Favourite & Favourite Item
            CreateMap<FavouritePlant, FavouriteItemAddRequest>().ReverseMap();
            CreateMap<Favourite,GetAllFavPlantsDto>().ReverseMap();
            CreateMap<FavouritePlant, FavoritePlantDto>();
            CreateMap<Plant, PlantInFavDto>().ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => _baseUrl + src.ImageUrl));

            // Comment
            CreateMap<AddCommentsDto, Comment>();
            CreateMap<GetAllCommentsDto, Comment>().ReverseMap();
            CreateMap<ApplicationUser, CommentUserDto>().ForMember(dest=>dest.ImgUrl , opt=> opt.MapFrom(src => _baseUrl + src.ImgUrl));
        }
    }
}
