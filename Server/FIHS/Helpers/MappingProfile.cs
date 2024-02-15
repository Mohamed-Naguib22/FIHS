using AutoMapper;
using FIHS.Dtos;
using FIHS.Dtos.ArticleDtos;
using FIHS.Dtos.AuthModels;
using FIHS.Dtos.DiseaseDto;
using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PestDto;
using FIHS.Dtos.PesticideDto;
using FIHS.Dtos.UserDtos;
using FIHS.Models.ArticleModels;
using FIHS.Models.AuthModels;
using FIHS.Models.Disease;
using FIHS.Models.Fertilizer;
using FIHS.Models.Pest;
using FIHS.Models.Pesticide;
using FIHS.Models.Plant;

namespace FIHS.Helpers
{
    public class MappingProfile : Profile
    {
        //private readonly string _baseUrl = "https://localhost:7184";
        private readonly string _baseUrl = "https://192.168.1.11:7184";

        public MappingProfile() 
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => _baseUrl + src.ProfilePicture));
            CreateMap<RegisterModel, ApplicationUser>().ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => "\\images\\Default_User_Image.png"));

            //Article
            CreateMap<AddArticleDto, Article>().ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<Article, ReturnArticleDto>()
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => _baseUrl + src.ImgUrl))
                .ForMember(dest => dest.NumOfLikes, opt => opt.MapFrom(src => src.ArticleLikes.Where(al => al.ArticleId == src.Id).Count()));

            CreateMap<SectionDto, ArticleSection>();
            CreateMap<TagDto, ArticleTag>();

            CreateMap<Plant, PlantDto>();
            CreateMap<PlantsTypesOfPlant, PlantTypeDto>().IncludeMembers(src=>src.PlantType);
            CreateMap<PlantType, PlantTypeDto>();
            CreateMap<PlantSoilTypes, SoilDto>().IncludeMembers(src => src.Soil);
            CreateMap<Soil, SoilDto>();
            CreateMap<Plant, PlantInDto>().ReverseMap();
            CreateMap<PestDto, Pest>().ForMember(p => p.ImageUrl, opt => opt.Ignore());
            CreateMap<DiseaseDto, Disease>().ForMember(d => d.ImageUrl, opt => opt.Ignore());
            /*mapping pesticide & fertilizer*/
            CreateMap<Pesticide, PesticideDto>().ReverseMap().ForMember(i => i.ImageURL, opt => opt.Ignore());
            CreateMap<Fertilizer, FertilizerDto>().ReverseMap().ForMember(i => i.ImageURL, opt => opt.Ignore());
            CreateMap<Pesticide, PesticideReturnDto>();
            CreateMap<Fertilizer, FertilizerReturnDto>();

            CreateMap<Fertilizer, IEnumerable<FertilizerReturnDto>>();
            CreateMap<Pesticide, IEnumerable<PesticideReturnDto>>();
        }
    }
    
}
