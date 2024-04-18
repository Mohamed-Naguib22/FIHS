using FIHS.Interfaces.IUser;
using FIHS.Interfaces;
using FIHS.Models.AuthModels;
using FIHS.Services.UserServices;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FakeItEasy;
using Google.Apis.Oauth2.v2;
using Microsoft.AspNetCore.Http;

namespace FIHS.Tests.UserTests;
public class UserServiceTests
{
    private readonly UserManager<ApplicationUser> _fakeUserManager;
    private readonly IImageService _fakeImageService;
    private readonly ITokenService _fakeTokenService;
    private readonly UserService _userService;
    public UserServiceTests()
    {
        _fakeUserManager = A.Fake<UserManager<ApplicationUser>>();
        _fakeImageService = A.Fake<IImageService>();
        _fakeTokenService = A.Fake<ITokenService>();
        _userService = new UserService(_fakeUserManager, _fakeImageService, _fakeTokenService);
    }

    [Fact]
    public async Task SetImageAsync_ImageSetSuccessfully_ReturnAuthModel()
    {
        var refreshToken = "refreshToken";
        var expectedUser = new ApplicationUser();
        var updatedImageUrl = "new_image.png";

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(expectedUser);
        A.CallTo(() => _fakeImageService.SetImage(A<IFormFile>.Ignored, A<string>.Ignored)).Returns(updatedImageUrl);
    }
}