using AutoMapper;
using FIHS.Dtos;
using FIHS.Dtos.Article;
using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PesticideDto;
using FIHS.Models;
using FIHS.Models.Fertilizer;
using FIHS.Models.Pesticide;
using FIHS.Models.Plant;

namespace FIHS.Helpers
{
    public class MappingProfile : Profile
    {
        private readonly string _baseUrl = "https://localhost:7184";

        public MappingProfile() 
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => _baseUrl + src.ProfilePicture));
            CreateMap<RegisterModel, ApplicationUser>().ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => "\\images\\Default_User_Image.png"));
            CreateMap<ArticleDto, Article>().ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<ArticleSectionDto, ArticleSection>();
            CreateMap<Plant, PlantDto>();
            CreateMap<PlantsTypesOfPlant, PlantTypeDto>().IncludeMembers(src=>src.PlantType);
            CreateMap<PlantType, PlantTypeDto>();
            CreateMap<PlantSoilTypes, SoilDto>().IncludeMembers(src => src.Soil);
            CreateMap<Soil, SoilDto>();
            CreateMap<Plant, PlantInDto>().ReverseMap();

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
