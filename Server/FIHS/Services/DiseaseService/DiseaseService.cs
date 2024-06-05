using AutoMapper;
using FIHS.Dtos.DiseaseDto;
using FIHS.Extensions;
using FIHS.Interfaces;
using FIHS.Interfaces.IDisease;
using FIHS.Models.DiseaseModels;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services.DiseaseService
{
    public class DiseaseService : IDiseaseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public DiseaseService(ApplicationDbContext context, IImageService imageService, IMapper mapper)
        {
            _context = context;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<bool> AddImageAsync(int id,IFormFile img)
        {
            var disease=await _context.Diseases.FirstOrDefaultAsync(d => d.Id == id);
            if (disease == null) 
                return false;
            disease.ImageUrl = _imageService.SetImage(img);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<ReturnDiseaseDto> AddDiseaseAsync(DiseaseDto diseaseDto)
        {
            var disease=_mapper.Map<Disease>(diseaseDto);
            disease.ImageUrl=_imageService.SetImage(diseaseDto.Image);
            await _context.AddAsync(disease);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnDiseaseDto>(disease);
        }

        public async Task<ReturnDiseaseDto> DeleteDiseaseAsync(int id)
        {
            var disease=await FindDiseaseById(id);
            if (disease == null)
                return new ReturnDiseaseDto { Message = "لم يتم العثور علي اي مرض" };
            _imageService.DeleteImage(disease.ImageUrl);
            _context.Remove(disease);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnDiseaseDto>(disease);
        }
        public async Task<ReturnDiseaseDto> GetDiseaseByIdAsync(int id)
        {
            var disease = await FindDiseaseById(id);
            if (disease == null)
                return new ReturnDiseaseDto { Message = "لم يتم العثور علي اي مرض" };
            return _mapper.Map<ReturnDiseaseDto>(disease);
        }

        public DiseasesResultDto GetDiseases(int offset, int limit)
        {
            var paginateDiseases= _context.Diseases.Include(d => d.Plants).ThenInclude(p => p.Plant).Paginate(offset, limit);
            var diseases= _mapper.Map<IEnumerable<ReturnDiseaseDto>>(paginateDiseases.result);
            return new DiseasesResultDto(diseases, paginateDiseases.nextPage);
        }

        public DiseasesResultDto SearchForDiseaseByName(string name, int offset, int limit)
        {
           var paginateDiseases= _context.Diseases.Include(d => d.Plants).ThenInclude(p => p.Plant).Where(d => d.Name.ToLower().Trim().Contains(name.ToLower().Trim())).Paginate(offset, limit);
           var diseases= _mapper.Map<IEnumerable<ReturnDiseaseDto>>(paginateDiseases.result);
           return new DiseasesResultDto(diseases,paginateDiseases.nextPage);
        }

        public async Task<ReturnDiseaseDto> UpdateDiseaseAsync(UpdateDiseaseDto diseaseDto, int id)
        {
            var disease = await FindDiseaseById(id);
            if (disease == null)
                return new ReturnDiseaseDto { Message = "لم يتم العثور علي اي مرض" };
            _mapper.Map(diseaseDto, disease);
            disease.ImageUrl=diseaseDto.Image!=null?_imageService.SetImage(diseaseDto.Image,disease.ImageUrl):disease.ImageUrl;
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnDiseaseDto>(disease);
        }
        public async Task<bool> IsDiseaseExist(int diseaseId)=>await _context.Diseases.AnyAsync(d=>d.Id==diseaseId);
        private async Task<Disease> FindDiseaseById(int diseaseId) => await _context.Diseases.Include(d => d.Plants).ThenInclude(p => p.Plant).SingleOrDefaultAsync(d => d.Id == diseaseId);
    }
}
