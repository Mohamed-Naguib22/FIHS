//using AutoMapper;
//using FIHS.Services.FertilizerService;
//using System.Threading.Tasks;
//using FakeItEasy;
//using FIHS.Interfaces;
//using FIHS.Models.Fertilizer;
//using FIHS.Dtos.FertilizerDto;
//using FIHS.Dtos.ArticleDtos;
//namespace FIHS.Tests.FertilizersTests
//{
//    public class FertilizerServicesTestscs
//    {
//        private readonly FertilizerService _fertilizerService;

//        private readonly IImageService _imageService;
//        private readonly IMapper _fakeMapper;
//        //private readonly InMemoryDbContext dbContext;
//        public FertilizerServicesTestscs()
//        {
//             //dbContext = new InMemoryDbContext();
//            _fakeMapper = A.Fake<IMapper>();
//            _imageService = A.Fake<IImageService>();
//            //_fertilizerService =  new FertilizerService(dbContext, _imageService, _fakeMapper);
//        }

//        [Fact]
//        //public async void GetAllFertilizerAsync_WhenThereAreFertilizers_ListOfFertilizer()
//        //{
//        //    IEnumerable<Fertilizer> expectedFertilier = new List<Fertilizer> 
//        //    { new Fertilizer(), new Fertilizer(), new Fertilizer() };
//        //    IEnumerable<FertilizerReturnDto> expectedFertilierDto = new List<FertilizerReturnDto> 
//        //    { new FertilizerReturnDto(), new FertilizerReturnDto(), new FertilizerReturnDto() };
//        //     A.CallTo(dbContext.Fertilizers.ToList()).Returns(Task.FromResult(expectedFertilierDto));
//        //    A.CallTo(() => _fakeMapper.Map<IEnumerable<FertilizerReturnDto>>(expectedFertilier)).Returns(expectedFertilierDto);
//        //    var actualFertilizerDto = _fertilizerService.GetAllFertilizerAsync();
//        //    Assert.Equal(expectedFertilierDto, actualFertilizerDto);
//        //}
//    }
//}
