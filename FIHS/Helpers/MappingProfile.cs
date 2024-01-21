using AutoMapper;
using FIHS.Dtos;
using FIHS.Models;
using FIHS.Models.Plant;

namespace FIHS.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<ApplicationUser, UserDto>();
            CreateMap<RegisterModel, ApplicationUser>().ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => "\\images\\No_Image.png"));
            CreateMap<ArticleDto, Article>().ForMember(dest => dest.ImgUrl, opt => opt.Ignore());
            CreateMap<Plant, PlantDto>();
            CreateMap<PlantsTypesOfPlant, PlantTypeDto>().IncludeMembers(src=>src.PlantType);
            CreateMap<PlantType, PlantTypeDto>();
            CreateMap<PlantSoilTypes, SoilDto>().IncludeMembers(src => src.Soil);
            CreateMap<Soil, SoilDto>();
            CreateMap<Plant, PlantInDto>().ReverseMap();
        }
    }
    
}
