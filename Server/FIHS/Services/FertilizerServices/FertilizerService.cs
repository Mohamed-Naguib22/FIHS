using AutoMapper;
using FIHS.Dtos.FertilizerDto;
using FIHS.Dtos.PesticideDto;
using FIHS.Interfaces;
using FIHS.Interfaces.IFertilizer;
using FIHS.Models.Fertilizer;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.FertilizerService
{
    public class FertilizerService : IFertilizer
    {
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private readonly ApplicationDbContext _context;

        public FertilizerService(ApplicationDbContext context, IImageService imageService, IMapper mapper)
        {
            _context = context;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<FertilizerReturnDto> AddFertilizerAsync(FertilizerDto dto)
        {
            var fertilizer = _mapper.Map<Fertilizer>(dto);
            fertilizer.ImageURL = _imageService.SetImage(dto.ImageURL);
            await _context.AddAsync(fertilizer);
            await _context.SaveChangesAsync();
            var fertilizerDto = _mapper.Map<FertilizerReturnDto>(fertilizer);
            return fertilizerDto;
        }

        public async Task<FertilizerReturnDto> DeleteFertilizerAsync(Fertilizer fertilizer)
        {
            _context.Remove(fertilizer);
            await _context.SaveChangesAsync();
            var fertilizerDto = _mapper.Map<FertilizerReturnDto>(fertilizer);
            return fertilizerDto;
        }

        public async Task<IEnumerable<FertilizerReturnDto>> GetAllFertilizerAsync()
        {
            var fertilizer = await _context.Fertilizers.ToListAsync();
            var fertilizerDto = _mapper.Map<IEnumerable<FertilizerReturnDto>>(fertilizer);
            return fertilizerDto;
        }

        public async Task<Fertilizer> GetFertilizerByIdAsync(int id)
        {
            var fertilizer = await _context.Fertilizers.SingleOrDefaultAsync(f => f.Id == id);
            return fertilizer;
        }

        public async Task<IEnumerable<FertilizerReturnDto>> GetFertilizerByNameAsync(string name)
        {
            var fertilizer = await _context.Fertilizers.Where(p => p.Name.ToLower().Contains(name)).ToListAsync();
            var fertilizerDto = _mapper.Map<IEnumerable<FertilizerReturnDto>>(fertilizer);

            return fertilizerDto;
        }

        public async Task<FertilizerReturnDto> UpdateFertilizerAsync(FertilizerDto dto, int id)
        {
            var fertilizer = await GetFertilizerByIdAsync(id);
            fertilizer.Name = dto.Name ?? fertilizer.Name;
            fertilizer.Manufactuer = dto.Manufactuer ?? fertilizer.Manufactuer;
            fertilizer.UsageInstructions = dto.UsageInstructions ?? fertilizer.UsageInstructions;
            fertilizer.ImageURL = _imageService.SetImage(dto.ImageURL, fertilizer.ImageURL) ?? fertilizer.ImageURL;

            _context.Update(fertilizer);
            await _context.SaveChangesAsync();
            var fertilizerDto = _mapper.Map<FertilizerReturnDto>(fertilizer);

            return fertilizerDto;
        }
    }
}
