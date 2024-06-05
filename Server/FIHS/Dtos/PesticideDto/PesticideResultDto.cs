using FIHS.Dtos.FertilizerDto;

namespace FIHS.Dtos.PesticideDto
{
    public class PesticideResultDto
    {
        public IEnumerable<PesticideReturnDto> Pesticides { get; set; }
        public int NextPage { get; set; }
        public PesticideResultDto(IEnumerable<PesticideReturnDto> pesticides, int nextPage)
        {
            Pesticides = pesticides;
            NextPage = nextPage;
        }
    }
}
