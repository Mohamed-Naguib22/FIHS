using AutoMapper;
using FIHS.Dtos.PestDto;
using FIHS.Interfaces;
using FIHS.Interfaces.IPest;
using FIHS.Models.Pest;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PestService
{
    public class PestService : IPestService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public PestService(ApplicationDbContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<Pest> AddPestAsync(PestDto pestDto)
        {
            if (await _context.Pests.AnyAsync(p => p.Name.ToLower().Trim() == pestDto.Name.ToLower().Trim()))
                return new Pest { Message = "This pest already exists" };
            var pest =_mapper.Map<Pest>(pestDto);
            pest.ImageUrl = _imageService.SetImage(pestDto.Image);
            await _context.Pests.AddAsync(pest);
            await _context.SaveChangesAsync();
            return pest;
        }

        public async Task<Pest> DeletePestAsync(int id)
        {
            var pest = await GetPestByIdAsync(id);
            if (pest == null)
                return new Pest { Message = "No Pest is Found" };
            _imageService.DeleteImage(pest.ImageUrl);
            _context.Remove(pest);
            await _context.SaveChangesAsync();
            return pest;
        }

        private async Task<Pest> GetPestByIdAsync(int id)
        {
            var pest=await _context.Pests.SingleOrDefaultAsync(p=>p.Id==id);
            return pest;
        }

        public async Task<Pest> GetPestByNameAsync(string name)
        {
            var pest =await _context.Pests.SingleOrDefaultAsync(p=>p.Name.ToLower().Trim()==name.ToLower().Trim());
            if (pest == null)
                return new Pest { Message = "No Pest is Found" };
            return pest;
        }

        public async Task<IEnumerable<Pest>> GetPestsAsync()
        {
           var pests=await _context.Pests.ToListAsync();
            return pests;
        }

        public async Task<Pest> UpdatePestAsync(UpdatePestDto pestDto, int id)
        {
            var pest = await GetPestByIdAsync(id);
            if (pest == null)
                return new Pest { Message = "No Pest is Found" };
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
            return pest;
        }

        public async Task<IEnumerable<Pest>> SearchForPestByNameAsync(string name)
        {
            var pests=await _context.Pests.Where(p=>p.Name.ToLower().Trim().Contains(name.ToLower().Trim())).ToListAsync();
            return pests;
        }
    }
}
