using AutoMapper;
using FakeItEasy;
using FIHS.Interfaces.IArticle;
using FIHS.Interfaces.IUser;
using FIHS.Interfaces;
using FIHS.Models.PlantModels;
using FIHS.Services.ArticleService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIHS.Interfaces.IFavourite;
using FIHS.Interfaces.IPlant;
using NUnit.Framework.Internal;
using FIHS.Dtos;
using Microsoft.AspNetCore.Http;
using FIHS.Repositories;
using FIHS.Services.PlantservicesImp;

namespace FIHS.Tests.PlantTests
{
    public class PlantServicesTests
    {
        
        private readonly IMapper _fakeMapper;
        private readonly IImageService _fakeImageService;
        private readonly ITokenService _fakeJwtService;
        private readonly IFavourite _fakeFavourite;
        private readonly IPlantRepository _fakePlantRepository;
        private readonly PlantServices _plantServices;
        public PlantServicesTests( )
        {
            _fakeImageService = A.Fake<IImageService>();
            _fakeJwtService = A.Fake<ITokenService>();
            _fakeMapper = A.Fake<IMapper>();
            _fakeFavourite = A.Fake<IFavourite>();
            _fakePlantRepository = A.Fake<IPlantRepository>();
            _plantServices = new PlantServices(_fakeImageService, _fakeMapper, _fakeFavourite, _fakePlantRepository);
        }
        [Fact]
        public async Task AddPlant_ShouldReturnTrueAndPlantShouldBeAdded_WhenPlantNameIsUnique()
        {
            //Arrange
            var SUT = _plantServices;
            var fakePlantDto = new PlantInDto()
            {
                SoilsId = new List<int> { 1, 2 },
                PlantTypesId = new List<int> { 1, 2 },
                ImageUrl = "test.png",
                ImgFile = A.Fake<IFormFile>()
            };
            A.CallTo(() => _fakePlantRepository.AddPlant(A<Plant>.Ignored)).Returns(true);
            //Act
            var result = await SUT.AddPlant(fakePlantDto);

            //Assert
            Assert.True(result);
        }
        [Fact]
        public async Task AddPlant_WhenPlantNameIsNotUnique_ReturnFalseAndPlantShouldNotBeAdded()
        {
            //Arrange

            var SUT = _plantServices;
            var fakePlantDto = new PlantInDto()
            {
                Name = "test",
                SoilsId = new List<int> { 1, 2 },
                PlantTypesId = new List<int> { 1, 2 },
                ImageUrl = "test.png",
                ImgFile = A.Fake<IFormFile>()
            };
            A.CallTo(() => _fakePlantRepository.IsPlantNameExist(A<Plant>.Ignored)).Returns(true);

            //Act
            var result = await SUT.AddPlant(fakePlantDto);

            //Assert
            Assert.False(result);
        }
        [Fact]
        public async Task GetPlantById_WhenPlantWithIdExist_ReturnPlant()
        {
            // Arrange
            var SUT = _plantServices;
            var fakePlant = new Plant() { Id = 1 , Name="test"};
            var fakePlantDto = new PlantDto() { Id = 1 , Name="test"};
            A.CallTo(() => _fakePlantRepository.IsPlantExist(A<int>.Ignored)).Returns(true);
            A.CallTo(() => _fakeMapper.Map<PlantDto>(fakePlant)).Returns(fakePlantDto);
            A.CallTo(() => _fakePlantRepository.GetPlantByIdAsync(1)).Returns(Task.FromResult(fakePlant));

            //A.CallTo(() => _fakePlantRepository.GetPlantByIdAsync(1)).Returns(Task.FromResult())
            // Act
            var result = await SUT.GetPlantByIdAsync(1);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(1, fakePlant.Id);
            Assert.Equal("test", fakePlant.Name);
            Assert.Empty(result.Message);
        }
        [Fact]
        public async Task GetPlantById_WhenPlantWithIdNotExist_ReturnErrorMessage()
        {
            // Arrange
            var SUT = _plantServices;
            A.CallTo(() => _fakePlantRepository.IsPlantExist(A<int>.Ignored)).Returns(false);


            //A.CallTo(() => _fakePlantRepository.GetPlantByIdAsync(1)).Returns(Task.FromResult())
            // Act
            var result = await SUT.GetPlantByIdAsync(1);

            //Assert
            Assert.NotEmpty(result.Message);
        }
    }
}
