using AutoMapper;
using FIHS.Dtos.DiseaseDto;
using FIHS.Interfaces;
using FIHS.Interfaces.IDisease;
using FIHS.Models.Disease;
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

        public async Task<Disease> AddDiseaseAsync(DiseaseDto diseaseDto)
        {
            if (await _context.Diseases.AnyAsync(d => d.Name.ToLower().Trim() == diseaseDto.Name.ToLower().Trim()))
                return new Disease { Message = "This disease already exists" };
            var disease=_mapper.Map<Disease>(diseaseDto);
            disease.ImageUrl=_imageService.SetImage(diseaseDto.Image);
            await _context.AddAsync(disease);
            await _context.SaveChangesAsync();
            return disease;
        }

        public async Task<Disease> DeleteDiseaseAsync(int id)
        {
            var disease=await GetDiseaseByIdAsync(id);
            if (disease == null)
                return new Disease { Message = "No Disease is Found" };
            _imageService.DeleteImage(disease.ImageUrl);
            _context.Remove(disease);
            await _context.SaveChangesAsync();
            return disease;
        }
        private async Task<Disease> GetDiseaseByIdAsync(int id)
        {
            var disease = await _context.Diseases.SingleOrDefaultAsync(d => d.Id == id);
            return disease;
        }

        public async Task<Disease> GetDiseaseByNameAsync(string name)
        {
            var disease =await _context.Diseases.SingleOrDefaultAsync(d => d.Name.ToLower().Trim() == name.ToLower().Trim());
            if (disease == null)
                return new Disease { Message = "No Disease is Found" };
            return disease;
        }

        public async Task<IEnumerable<Disease>> GetDiseasesAsync()
        {
            var diseases = await _context.Diseases.ToListAsync();
            return diseases;
        }

        public async Task<IEnumerable<Disease>> SearchForDiseaseByNameAsync(string name)
        {
            var diseases = await _context.Diseases.Where(d=>d.Name.ToLower().Trim().Contains(name.ToLower().Trim())).ToListAsync();
            return diseases;
        }

        public async Task<Disease> UpdateDiseaseAsync(UpdateDiseaseDto diseaseDto, int id)
        {
            var disease=await GetDiseaseByIdAsync(id);
            if (disease == null)
                return new Disease { Message = "No Disease is Found" };
            disease.Name = diseaseDto.Name ?? disease.Name;
            disease.PreventionMethods = diseaseDto.PreventionMethods ?? disease.PreventionMethods;
            disease.Description = diseaseDto.Description ?? disease.Description;
            disease.Symptoms = diseaseDto.Symptoms ?? disease.Symptoms;
            disease.Treatments= diseaseDto.Treatments ??disease.Treatments;
            disease.ImageUrl=diseaseDto.Image!=null?_imageService.SetImage(diseaseDto.Image,disease.ImageUrl):disease.ImageUrl;
            _context.Update(disease);
            await _context.SaveChangesAsync();
            return disease;
        }
    }
}
