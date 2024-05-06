
namespace FIHS.Dtos.DiseaseDto
{
    public class DiseasesResultDto
    {
        public IEnumerable<ReturnDiseaseDto> Diseases { get; set; }
        public int NextPage { get; set; }
        public DiseasesResultDto(IEnumerable<ReturnDiseaseDto> diseases, int nextPage)
        {
            Diseases = diseases;
            NextPage = nextPage;
        }
    }
}
