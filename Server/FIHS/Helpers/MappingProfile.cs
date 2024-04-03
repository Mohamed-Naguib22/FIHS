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
        public MappingProfile() 
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<RegisterModel, ApplicationUser>()
                .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => "\\images\\Default_User_Image.png"))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
            CreateMap<ApplicationUser, AuthModel>()
                .ForMember(dest => dest.ImgUrl, opt => opt.Ignore());

            //Article
            CreateMap<AddArticleDto, Article>().ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<Article, ReturnArticleDto>()
                .ForMember(dest => dest.ImgUrl, opt => opt.Ignore())
                .ForMember(dest => dest.NumOfLikes, opt => opt.MapFrom(src => src.ArticleLikes.Where(al => al.ArticleId == src.Id).Count()));

            CreateMap<AddSectionDto, ArticleSection>();
            CreateMap<TagDto, ArticleTag>();

            CreateMap<Plant, PlantDto>();
            CreateMap<PlantsTypesOfPlant, PlantTypeDto>().IncludeMembers(src=>src.PlantType);
            CreateMap<PlantType, PlantTypeDto>();
            CreateMap<PlantSoilTypes, SoilDto>().IncludeMembers(src => src.Soil);
            CreateMap<Soil, SoilDto>();
            CreateMap<Plant, PlantInDto>().ReverseMap();
            //Pest & Disease
            CreateMap<PestDto, Pest>().ForMember(p => p.ImageUrl, opt => opt.Ignore());
            CreateMap<DiseaseDto, Disease>().ForMember(d => d.ImageUrl, opt => opt.Ignore());
            CreateMap<Disease, ReturnDiseaseDto>().ForMember(d => d.ImageUrl, opt => opt.Ignore());
            CreateMap<Pest,ReturnPestDto>().ForMember(p=>p.ImageUrl, opt => opt.Ignore());
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
