using AutoMapper;
using FIHS.Dtos.PestDto;
using FIHS.Extensions;
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

        public PestService(ApplicationDbContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }
        public async Task<ReturnPestDto> AddPestAsync(PestDto pestDto)
        {
            var pest =_mapper.Map<Pest>(pestDto);
            pest.ImageUrl = _imageService.SetImage(pestDto.Image);
            await _context.Pests.AddAsync(pest);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnPestDto>(pest);
        }

        public async Task<ReturnPestDto> DeletePestAsync(int id)
        {
            var pest = await FindPestById(id);
            if (pest == null)
                return new ReturnPestDto { Message = "لم يتم العثور علي اي افه" };
            _imageService.DeleteImage(pest.ImageUrl);
            _context.Remove(pest);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnPestDto>(pest);
        }

        public async Task<ReturnPestDto> GetPestByIdAsync(int id)
        {
            var pest = await FindPestById(id);
            if (pest == null)
                return new ReturnPestDto { Message = "لم يتم العثور علي اي افه" };
            return _mapper.Map<ReturnPestDto>(pest);
        }


        public PestsResultDto GetPests(int offset, int limit)
        {
            var paginatePests = _context.Pests.Include(p => p.Plants).ThenInclude(p => p.Plant).Include(p => p.Pesticides).ThenInclude(p => p.Pesticide).Paginate(offset, limit);
            var pests = _mapper.Map<IEnumerable<ReturnPestDto>>(paginatePests.result);
            return new PestsResultDto(pests, paginatePests.nextPage);
        }

        public async Task<ReturnPestDto> UpdatePestAsync(UpdatePestDto pestDto, int id)
        {
            var pest = await FindPestById(id);
            if (pest == null)
                return new ReturnPestDto { Message = "لم يتم العثور علي اي افه" };
            _mapper.Map(pestDto, pest);
            pest.ImageUrl = pestDto.Image != null ? _imageService.SetImage(pestDto.Image, pest.ImageUrl) : pest.ImageUrl;
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnPestDto>(pest);
        }

        public PestsResultDto SearchForPestByName(string name,int offset, int limit)
        {
            var paginatePests = _context.Pests.Include(p => p.Plants).ThenInclude(p => p.Plant).Include(p => p.Pesticides).ThenInclude(p => p.Pesticide).Where(p => p.Name.ToLower().Trim().Contains(name.ToLower().Trim())).Paginate(offset, limit);
            var pests= _mapper.Map<IEnumerable<ReturnPestDto>>(paginatePests.result);
            return new PestsResultDto(pests, paginatePests.nextPage);
        }
        public async Task<bool> IsPestExist(int pestId)=>await _context.Pests.AnyAsync(p=>p.Id== pestId);
        private async Task<Pest> FindPestById(int pestId) => await _context.Pests.Include(p => p.Plants).ThenInclude(p => p.Plant).Include(p => p.Pesticides).ThenInclude(p => p.Pesticide).SingleOrDefaultAsync(p => p.Id == pestId); 
    }
}
