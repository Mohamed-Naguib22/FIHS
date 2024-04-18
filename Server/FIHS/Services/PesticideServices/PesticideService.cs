using AutoMapper;
using FIHS.Dtos.PesticideDto;
using FIHS.Interfaces;
using FIHS.Interfaces.IPesticide;
using FIHS.Models.PesticideModels;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.PesticideService
{

    public class PesticideService : IPesticide
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;

        public PesticideService(IImageService imageService, ApplicationDbContext context, IMapper mapper)
        {
            _imageService = imageService;
            _context = context;
            _mapper = mapper;
        }

        public async Task<PesticideReturnDto> AddPesticideAsync(PesticideDto dto)
        {
            var pesticide = _mapper.Map<Pesticide>(dto);
            pesticide.ImageURL = _imageService.SetImage(dto.ImageURL);
            await _context.AddAsync(pesticide);
            await _context.SaveChangesAsync();
            var pesticideDto = _mapper.Map<PesticideReturnDto>(pesticide);
            return pesticideDto;
        }

        public async Task<PesticideReturnDto> DeleteAsync(Pesticide pesticide)
        {
            _context.Remove(pesticide);
            await _context.SaveChangesAsync();
            var pesticideDto = _mapper.Map<PesticideReturnDto>(pesticide);
            return pesticideDto;
        }

        public async Task<IEnumerable<PesticideReturnDto>> GetAllPesticideAsync()
        {
            var pesticides = await _context.Pesticides.ToListAsync();
            var pesticideDto = _mapper.Map<IEnumerable<PesticideReturnDto>>(pesticides);

            return pesticideDto;
        }

        public async Task<Pesticide> GetByIdAsync(int id)
        {
            return await _context.Pesticides.SingleOrDefaultAsync(p => p.Id == id);

        }

        public async Task<IEnumerable<PesticideReturnDto>> GetPesticideByNameAsync(string name)
        {
            var pesticide = await _context.Pesticides.Where(p => p.Name.ToLower().Contains(name)).ToListAsync();
            var pesticideDto = _mapper.Map<IEnumerable<PesticideReturnDto>>(pesticide);

            return pesticideDto;
        }

        public async Task<PesticideReturnDto> UpdateAsync(PesticideDto dto, int id)
        {
            var pesticide = await GetByIdAsync(id);
            pesticide.Name = dto.Name ?? pesticide.Name;
            pesticide.Manufactuer = dto.Manufactuer ?? pesticide.Manufactuer;
            pesticide.Price = dto.Price ?? pesticide.Price;
            pesticide.Description = dto.Description ?? pesticide.Description;
            pesticide.Type = dto.Type ?? pesticide.Type;
            pesticide.Toxicity = dto.Toxicity ?? pesticide.Toxicity;
            pesticide.ImageURL = _imageService.SetImage(dto.ImageURL, pesticide.ImageURL) ?? pesticide.ImageURL;
            _context.Update(pesticide);
            await _context.SaveChangesAsync();

            var pesticidesDto = _mapper.Map<PesticideReturnDto>(pesticide);
            return pesticidesDto;

        }
    }
}
