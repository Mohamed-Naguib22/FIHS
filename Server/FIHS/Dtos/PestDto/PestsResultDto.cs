namespace FIHS.Dtos.PestDto
{
    public class PestsResultDto
    {
        public IEnumerable<ReturnPestDto> Pests { get; set; }
        public int NextPage { get; set; }
        public PestsResultDto(IEnumerable<ReturnPestDto> pests, int nextPage)
        {
            Pests = pests;
            NextPage = nextPage;
        }
    }
}
