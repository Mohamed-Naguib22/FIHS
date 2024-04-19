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
using FIHS.Dtos.UserDtos;
using FIHS.Dtos.AuthModels;

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
        var refreshToken = "validToken";
        var expectedUser = new ApplicationUser();
        var updatedImageUrl = "new_image.png";
        var mockFile = A.Fake<IFormFile>();
        var authModel = new AuthModel { Succeeded = true };

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeImageService.SetImage(mockFile, A<string>.Ignored)).Returns(updatedImageUrl);
        A.CallTo(() => _fakeUserManager.UpdateAsync(expectedUser)).Returns(Task.FromResult(IdentityResult.Success));
        A.CallTo(() => _fakeTokenService.CreateAuthModel(expectedUser)).Returns(authModel);

        var result = await _userService.SetImageAsync(refreshToken, mockFile);

        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task ChangePasswordAsync_CorrectPassword_ReturnAuthModel()
    {
        var refreshToken = "refreshToken";
        var expectedUser = new ApplicationUser { PasswordHash = "currentPassword" };
        var model = new ChangePasswordModel { CurrentPassword = "currentPassword", NewPassword = "newPassword" };
        var authModel = new AuthModel { Succeeded = true };

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(expectedUser, model.CurrentPassword)).Returns(Task.FromResult(true));
        A.CallTo(() => _fakeUserManager.ChangePasswordAsync(expectedUser, model.CurrentPassword, model.NewPassword)).Returns(Task.FromResult(IdentityResult.Success));
        A.CallTo(() => _fakeTokenService.CreateAuthModel(expectedUser)).Returns(authModel);

        var result = await _userService.ChangePasswordAsync(refreshToken, model);

        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task ChangePasswordAsync_IncorrectPassword_ReturnErrorMessage()
    {
        var refreshToken = "refreshToken";
        var expectedUser = new ApplicationUser();
        var model = new ChangePasswordModel { CurrentPassword = "currentPassword", NewPassword = "newPassword" };

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(expectedUser, model.CurrentPassword)).Returns(Task.FromResult(false));

        var result = await _userService.ChangePasswordAsync(refreshToken, model);

        Assert.False(result.Succeeded);
        A.CallTo(() => _fakeUserManager.ChangePasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeTokenService.CreateAuthModel(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
    }

    [Fact]
    public async Task ChangePasswordAsync_InvalidToken_ReturnErrorMessage()
    {
        var refreshToken = "invalidToken";

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _userService.ChangePasswordAsync(refreshToken, new ChangePasswordModel());

        Assert.False(result.Succeeded);
        Assert.Equal("Invalid token.", result.Message);
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeUserManager.ChangePasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeTokenService.CreateAuthModel(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
    }

    [Fact]
    public async Task DeleteAccountAsync_ValidToken_ReturnSuccessMessage()
    {
        var refreshToken = "invalidToken";
        var expectedUser = new ApplicationUser { ImgUrl = "URL" };

        A.CallTo(() => _fakeTokenService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeImageService.DeleteImage(expectedUser.ImgUrl));
        A.CallTo(() => _fakeUserManager.DeleteAsync(expectedUser)).Returns(Task.FromResult(IdentityResult.Success));

        var result = await _userService.DeleteAccountAsync(refreshToken);

        Assert.True(result.Succeeded);
    }
}