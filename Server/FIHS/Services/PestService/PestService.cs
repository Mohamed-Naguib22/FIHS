using AutoMapper;
using FIHS.Dtos.PestDto;
using FIHS.Interfaces;
using FIHS.Interfaces.IPest;
using FIHS.Models.PestModels;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PestService
{
    public class PestService : IPestService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private readonly string _baseUrl;

        public PestService(ApplicationDbContext context, IMapper mapper, IImageService imageService,IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
            _baseUrl = configuration["BaseUrl"];
        }

        public async Task<ReturnPestDto> AddPestAsync(PestDto pestDto)
        {
            if (await _context.Pests.AnyAsync(p => p.Name.ToLower().Trim() == pestDto.Name.ToLower().Trim()))
                return new ReturnPestDto { Message = "This pest already exists" };
            var pest =_mapper.Map<Pest>(pestDto);
            pest.ImageUrl = _imageService.SetImage(pestDto.Image);
            await _context.Pests.AddAsync(pest);
            await _context.SaveChangesAsync();
            var pestView = _mapper.Map<ReturnPestDto>(pest);
            pestView.ImageUrl=_baseUrl+pest.ImageUrl;
            return pestView;
        }

        public async Task<ReturnPestDto> DeletePestAsync(int id)
        {
            var pest = await _context.Pests.SingleOrDefaultAsync(p=>p.Id==id);
            if (pest == null)
                return new ReturnPestDto { Message = "No Pest is Found" };
            _imageService.DeleteImage(pest.ImageUrl);
            _context.Remove(pest);
            await _context.SaveChangesAsync();
            var pestView = _mapper.Map<ReturnPestDto>(pest);
            pestView.ImageUrl = _baseUrl + pest.ImageUrl;
            return pestView;
        }

        public async Task<ReturnPestDto> GetPestByIdAsync(int id)
        {
            var pest=await _context.Pests.SingleOrDefaultAsync(p=>p.Id==id);
            if (pest == null)
                return new ReturnPestDto { Message = "No pest is found" };
            var pestView = _mapper.Map<ReturnPestDto>(pest);
            pestView.ImageUrl = _baseUrl + pest.ImageUrl;
            return pestView;
        }

        public async Task<ReturnPestDto> GetPestByNameAsync(string name)
        {
            var pest =await _context.Pests.SingleOrDefaultAsync(p=>p.Name.ToLower().Trim()==name.ToLower().Trim());
            if (pest == null)
                return new ReturnPestDto { Message = "No Pest is Found" };
            var pestView = _mapper.Map<ReturnPestDto>(pest);
            pestView.ImageUrl = _baseUrl + pest.ImageUrl;
            return pestView;
        }

        public async Task<IEnumerable<ReturnPestDto>> GetPestsAsync()
        {
           var pests=await _context.Pests.Select(p=>new ReturnPestDto
           { 
               Id=p.Id,
               ControlMethods=p.ControlMethods,
               DamageSymptoms=p.DamageSymptoms,
               Description=p.Description,
               GeographicDistribution=p.GeographicDistribution,
               LifeCycle=p.LifeCycle,
               Name=p.Name,
               Reproduction=p.Reproduction,
               Species=p.Species,
               ImageUrl=_baseUrl+p.ImageUrl,
               
           }).ToListAsync();
            return pests;
        }

        public async Task<ReturnPestDto> UpdatePestAsync(UpdatePestDto pestDto, int id)
        {
            var pest = await _context.Pests.SingleOrDefaultAsync(p=>p.Id==id);
            if (pest == null)
                return new ReturnPestDto { Message = "No Pest is Found" };
            pest.Species = pestDto.Species ?? pest.Species;
            pest.ControlMethods=pestDto.ControlMethods ?? pest.ControlMethods;
            pest.DamageSymptoms=pestDto.DamageSymptoms ?? pest.DamageSymptoms;
            pest.Description=pestDto.Description ?? pest.Description;
            pest.GeographicDistribution=pestDto.GeographicDistribution ?? pest.GeographicDistribution;
            pest.LifeCycle=pestDto.LifeCycle ?? pest.LifeCycle;
            pest.Reproduction=pestDto.Reproduction??pest.Reproduction;
            pest.Name=pestDto.Name ?? pest.Name;
            pest.ImageUrl = pestDto.Image != null ? _imageService.SetImage(pestDto.Image, pest.ImageUrl) : pest.ImageUrl;
            _context.Update(pest);
            await _context.SaveChangesAsync();
            var pestView = _mapper.Map<ReturnPestDto>(pest);
            pestView.ImageUrl = _baseUrl + pest.ImageUrl;
            return pestView;
        }

        public async Task<IEnumerable<ReturnPestDto>> SearchForPestByNameAsync(string name)
        {
            var pests=await _context.Pests.Where(p=>p.Name.ToLower().Trim().Contains(name.ToLower().Trim())).Select(p => new ReturnPestDto
            {
                Id = p.Id,
                ControlMethods = p.ControlMethods,
                DamageSymptoms = p.DamageSymptoms,
                Description = p.Description,
                GeographicDistribution = p.GeographicDistribution,
                LifeCycle = p.LifeCycle,
                Name = p.Name,
                Reproduction = p.Reproduction,
                Species = p.Species,
                ImageUrl = _baseUrl + p.ImageUrl,

            }).ToListAsync();
            return pests;
        }
    }
}
