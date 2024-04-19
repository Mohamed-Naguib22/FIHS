using AutoMapper;
using FakeItEasy;
using FIHS.Dtos.AuthModels;
using FIHS.Interfaces;
using FIHS.Interfaces.IUser;
using FIHS.Models.AuthModels;
using FIHS.Services.UserServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace FIHS.Tests.AuthTests;
public class AuthServiceTests
{
    private readonly RoleManager<IdentityRole> _fakeRoleManager;
    private readonly UserManager<ApplicationUser> _fakeUserManager;
    private readonly ITokenService _fakeTokenService;
    private readonly IMapper _fakeMapper;
    private readonly IEmailSender _fakeEmailSender;
    private readonly ICacheService _fakeMemoryCache;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _fakeRoleManager = A.Fake<RoleManager<IdentityRole>>();
        _fakeEmailSender = A.Fake<IEmailSender>();
        _fakeMemoryCache = A.Fake<ICacheService>();
        _fakeUserManager = A.Fake<UserManager<ApplicationUser>>();
        _fakeTokenService = A.Fake<ITokenService>();
        _fakeMapper = A.Fake<IMapper>();
        _authService = new AuthService(_fakeUserManager, _fakeRoleManager,
            _fakeEmailSender, _fakeMemoryCache, _fakeMapper, _fakeTokenService);
    }

    // -----------------------------------------------Register Tests--------------------------------------------------
    [Fact]
    public async Task RegisterAysnc_Success_ReturnsSuccessAndVerificationMessage()
    {
        var registerModel = new RegisterModel 
        { 
            Email = "mohamednageb20172@gmail.com", 
            Password = "M1692002m@", 
            FirstName = "Mohamed",
            LastName = "Naguib",
            PhoneNumber = "01069083521"
        };

        var user = new ApplicationUser();
        var verificationCode = 123456;

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(registerModel.Email)).Returns(Task.FromResult<ApplicationUser>(null));
        A.CallTo(() => _fakeMapper.Map<ApplicationUser>(registerModel)).Returns(user);
        A.CallTo(() => _fakeUserManager.CreateAsync(user, registerModel.Password)).Returns(Task.FromResult(IdentityResult.Success));
        A.CallTo(() => _fakeUserManager.AddToRoleAsync(user, "User"));
        A.CallTo(() => _fakeUserManager.UpdateAsync(user));
        A.CallTo(() => _fakeEmailSender.SendEmailAsync(user.Email, A<string>.Ignored, A<string>.Ignored));
        A.CallTo(() => _fakeMemoryCache.Set(A<string>.Ignored, verificationCode, A<TimeSpan>.Ignored));

        var result = await _authService.RegisterAysnc(registerModel);

        Assert.True(result.Succeeded);
        Assert.Equal("يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك", result.Message);
    }

    [Fact]
    public async Task RegisterAsync_ExistingEmail_ReturnsEmailInUse()
    {
        var registerModel = new RegisterModel
        {
            Email = "mohamednageb20172@gmail.com",
            Password = "M1692002m@",
            FirstName = "Mohamed",
            LastName = "Naguib",
            PhoneNumber = "01069083521"
        };
        var user = new ApplicationUser();

        A.CallTo(() => _fakeMapper.Map<ApplicationUser>(registerModel)).Returns(user);
        A.CallTo(() => _fakeUserManager.FindByEmailAsync(registerModel.Email)).Returns(Task.FromResult(new ApplicationUser()));

        var result = await _authService.RegisterAysnc(registerModel);

        Assert.False(result.Succeeded);
        Assert.Equal("البريد الإلكتروني مستخدم بالفعل", result.Message);
    }

    // -----------------------------------------------Login Tests--------------------------------------------------
    [Fact]
    public async Task LoginAsync_ValidCredentials_ReturnsAuthToken()
    {
        var model = new TokenrRequestModel { Email = "mohamednageb20172@gmail.com", Password = "M1692002m@" };
        var user = new ApplicationUser { EmailConfirmed = true };
        var authModel = new AuthModel { Succeeded = true };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(user));
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(user, model.Password)).Returns(Task.FromResult(true));
        A.CallTo(() => _fakeUserManager.IsEmailConfirmedAsync(user)).Returns(Task.FromResult(true));
        A.CallTo(() => _fakeTokenService.CreateAuthModel(user)).Returns(Task.FromResult(authModel));

        var result = await _authService.LoginAsync(model);

        Assert.True(result.Succeeded);
        Assert.True(result.IsVerified);
    }

    [Fact]
    public async Task LoginAsync_InvalidCredentials_ReturnsInvalidCredentialsMessage()
    {
        var model = new TokenrRequestModel { Email = "mohamednageb20172@gmail.com", Password = "M1692002m@" };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(new ApplicationUser()));
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored)).Returns(Task.FromResult(false));

        var result = await _authService.LoginAsync(model);

        Assert.False(result.Succeeded);
        Assert.Equal("البريد الإلكتروني أو كلمة المرور غير صحيحة", result.Message);
    }

    [Fact]
    public async Task LoginAsync_UnverifiedEmail_ReturnsNotVerified()
    {
        var model = new TokenrRequestModel { Email = "mohamednageb20172@gmail.com", Password = "M1692002m@" };
        var user = new ApplicationUser { EmailConfirmed = false };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(user));
        A.CallTo(() => _fakeUserManager.CheckPasswordAsync(user, model.Password)).Returns(Task.FromResult(true));
        A.CallTo(() => _fakeUserManager.IsEmailConfirmedAsync(user)).Returns(Task.FromResult(false));

        var result = await _authService.LoginAsync(model);

        Assert.False(result.Succeeded);
        Assert.False(result.IsVerified);
    }

    // -----------------------------------------------Verify Account Tests--------------------------------------------------
    [Fact]
    public async Task VerifyAccountAsync_ValidCode_ReturnsAuthToken()
    {
        var model = new VerifyAccountModel { Email = "test@example.com", VerificationCode = "123456" };
        var expectedUser = new ApplicationUser { Id ="test", Email = "test@example.com", EmailConfirmed = false };
        var authModel = new AuthModel { Succeeded = true };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_VerificationCode")).Returns(expectedCahcedCode);
        A.CallTo(() => _fakeTokenService.CreateAuthModel(expectedUser)).Returns(Task.FromResult(authModel));

        var result = await _authService.VerifyAccountAsync(model);
            
        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task VerifyAccountAsync_InValidCode_ReturnsErrorMessage()
    {
        var model = new VerifyAccountModel { Email = "test@example.com", VerificationCode = "457890" };
        var expectedUser = new ApplicationUser { Id = "test", Email = "test@example.com", EmailConfirmed = false };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_VerificationCode")).Returns(expectedCahcedCode);

        var result = await _authService.VerifyAccountAsync(model);

        Assert.False(model.VerificationCode == expectedCahcedCode);
        Assert.Equal("رمز التحقق غير موجود أو انتهت صلاحيته", result.Message);
        Assert.False(result.Succeeded);
    }

    [Fact]
    public async Task VerifyAccountAsync_InvalidEmail_ReturnsErrorMessage()
    {
        var model = new VerifyAccountModel { Email = "test@example.com", VerificationCode = "123456" };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _authService.VerifyAccountAsync(model);

        Assert.Equal("البريد الإلكتروني غير صحيح", result.Message);
        Assert.False(result.Succeeded);
    }

    [Fact]
    public async Task VerifyAccountAsync_EmailAlreadyConfirmed_ReturnsErrorMessage()
    {
        var model = new VerifyAccountModel { Email = "test@example.com", VerificationCode = "123456" };
        var expectedUser = new ApplicationUser { Id = "test", Email = "test@example.com", EmailConfirmed = true };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_VerificationCode")).Returns(expectedCahcedCode);

        var result = await _authService.VerifyAccountAsync(model);

        Assert.Equal("هذا الحساب مفعل بالفعل", result.Message);
        Assert.False(result.Succeeded);
    }

    // -----------------------------------------------Resend Verification Code Tests--------------------------------------------------
    [Fact]
    public async Task ResendVerificationCodeAsync_Success_ReturnsSuccess()
    {
        var model = new EmailModel { Email = "test@example.com" };
        var expectedUser = new ApplicationUser { Id = "test", Email = "test@example.com" };
        var authModel = new AuthModel { Succeeded = true };
        var expectedCode = "123456";
        var oldCode = "654321";
        var key = $"{expectedUser.Id}_VerificationCode";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>(key)).Returns(oldCode);
        A.CallTo(() => _fakeMemoryCache.Remove(key));
        A.CallTo(() => _fakeEmailSender.SendEmailAsync(expectedUser.Email, A<string>.Ignored, A<string>.Ignored));
        A.CallTo(() => _fakeMemoryCache.Set(key, expectedCode, A<TimeSpan>.Ignored));

        var result = await _authService.ResendVerificationCodeAsync(model);

        Assert.True(result.Succeeded);
    }

    // -----------------------------------------------Forget Password Tests--------------------------------------------------
    [Fact]
    public async Task ForgetPasswordAsync_EmailExists_ReturnToken()
    {
        var model = new EmailModel { Email = "test@example.com" };
        var expectedUser = new ApplicationUser { Id = "test", Email = "test@example.com" };
        var expectedToken = "token";
        var code = 123456;

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeUserManager.GeneratePasswordResetTokenAsync(expectedUser)).Returns(Task.FromResult(expectedToken));
        A.CallTo(() => _fakeEmailSender.SendEmailAsync(expectedUser.Email, A<string>.Ignored, A<string>.Ignored));
        A.CallTo(() => _fakeMemoryCache.Set($"{expectedUser.Id}_ResetPasswordCode", code, A<TimeSpan>.Ignored));

        var result = await _authService.ForgetPasswordAsync(model);

        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task ForgetPasswordAsync_EmailNotFound_ReturnErrorMessage()
    {
        var model = new EmailModel { Email = "test@example.com" };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _authService.ForgetPasswordAsync(model);

        Assert.False(result.Succeeded);
        Assert.Equal("البريد الإلكتروني غير صحيح", result.Message);
        A.CallTo(() => _fakeUserManager.GeneratePasswordResetTokenAsync(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeEmailSender.SendEmailAsync(A<string>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeMemoryCache.Set(A<string>.Ignored, A<string>.Ignored, A<TimeSpan>.Ignored)).MustNotHaveHappened();
    }

    // -----------------------------------------------Forget Password Tests--------------------------------------------------
    [Fact]
    public async Task ResetPasswordAsync_ValidToken_ReturnAuthModel()
    {
        var model = new ResetPasswordModel { Email = "test@example.com", Token = "validToken", Code = "123456", NewPassword = "newPassword" };
        var expectedUser = new ApplicationUser { Email = "test@example.com" };
        var authModel = new AuthModel { Succeeded = true };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_ResetPasswordCode")).Returns(expectedCahcedCode);
        A.CallTo(() => _fakeUserManager.VerifyUserTokenAsync(expectedUser, A<string>.Ignored, "ResetPassword", model.Token)).Returns(Task.FromResult(true));
        A.CallTo(() => _fakeUserManager.ResetPasswordAsync(expectedUser, model.Token, model.NewPassword)).Returns(Task.FromResult(IdentityResult.Success));
        A.CallTo(() => _fakeTokenService.CreateAuthModel(expectedUser)).Returns(Task.FromResult(authModel));

        var result = await _authService.ResetPasswordAsync(model);

        Assert.True(result.Succeeded);
        Assert.Equal(expectedCahcedCode, model.Code);
    }

    [Fact]
    public async Task ResetPasswordAsync_EmailNotFound_ReturnErrorMessage()
    {
        var model = new ResetPasswordModel { Email = "test@example.com", Token = "validToken", Code = "123456", NewPassword = "newPassword" };

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _authService.ResetPasswordAsync(model);

        Assert.False(result.Succeeded);
        A.CallTo(() => _fakeMemoryCache.Get<string>(A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeUserManager.VerifyUserTokenAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeUserManager.ResetPasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeTokenService.CreateAuthModel(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
    }

    [Fact]
    public async Task ResetPasswordAsync_IncorrectCode_ReturnErrorMessage()
    {
        var model = new ResetPasswordModel { Email = "test@example.com", Token = "validToken", Code = "654321", NewPassword = "newPassword" };
        var expectedUser = new ApplicationUser { Email = "test@example.com" };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_ResetPasswordCode")).Returns(expectedCahcedCode);

        var result = await _authService.ResetPasswordAsync(model);

        Assert.False(result.Succeeded);
        Assert.NotEqual(expectedCahcedCode, model.Code);
        A.CallTo(() => _fakeUserManager.VerifyUserTokenAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeUserManager.ResetPasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeTokenService.CreateAuthModel(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
    }

    [Fact]
    public async Task ResetPasswordAsync_InValidToken_ReturnErrorMessage()
    {
        var model = new ResetPasswordModel { Email = "test@example.com", Token = "validToken", Code = "123456", NewPassword = "newPassword" };
        var expectedUser = new ApplicationUser { Email = "test@example.com" };
        var authModel = new AuthModel { Succeeded = true };
        var expectedCahcedCode = "123456";

        A.CallTo(() => _fakeUserManager.FindByEmailAsync(model.Email)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeMemoryCache.Get<string>($"{expectedUser.Id}_ResetPasswordCode")).Returns(expectedCahcedCode);
        A.CallTo(() => _fakeUserManager.VerifyUserTokenAsync(expectedUser, A<string>.Ignored, "ResetPassword", model.Token)).Returns(Task.FromResult(false));

        var result = await _authService.ResetPasswordAsync(model);

        Assert.False(result.Succeeded);
        A.CallTo(() => _fakeUserManager.ResetPasswordAsync(A<ApplicationUser>.Ignored, A<string>.Ignored, A<string>.Ignored)).MustNotHaveHappened();
        A.CallTo(() => _fakeTokenService.CreateAuthModel(A<ApplicationUser>.Ignored)).MustNotHaveHappened();
    }
}
