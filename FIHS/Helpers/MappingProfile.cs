using AutoMapper;
using FIHS.Dtos;
using FIHS.Models;

namespace FIHS.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}
