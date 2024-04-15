using AutoMapper;
using FIHS.Dtos;
using FIHS.Interfaces.IPlantType;
using FIHS.Models.Plant;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PlantTypeServices
{
    public class PlantTypeServices : IPlantType
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PlantTypeServices(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PlantTypeDto>> GetAllPlantTypesAsync()
        {
            return  _mapper.Map<IEnumerable<PlantTypeDto>>(await _context.PlantTypes.ToListAsync());
        }

        public async Task<PlantTypeDto> GetPlantTypeByNameAsync(string plantTypeName)
        {
            var plantType = await _context.PlantTypes.Where(p => p.Name == plantTypeName).Include(pt => pt.Plants).ThenInclude(p => p.Plant).FirstOrDefaultAsync();
            var plantTypeDto = _mapper.Map<PlantTypeDto>(plantType);
            return (plantTypeDto);
            
        }
    }
}
