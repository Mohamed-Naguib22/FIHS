using AutoMapper;
using Microsoft.EntityFrameworkCore;
using FakeItEasy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIHS.Services.ArticleService;
using Microsoft.AspNetCore.Identity;
using FIHS.Models.AuthModels;
using FIHS.Interfaces;
using FIHS.Models.ArticleModels;
using FIHS.Dtos.ArticleDtos;
using FIHS.Interfaces.IArticle;
using FIHS.Interfaces.IUser;

namespace FIHS.Tests.ArticleTests;
public class ArticleServiceTests
{
    private readonly ArticleService _articleService;
    private readonly IArticleRepository _fakeArticleRepository;
    private readonly IMapper _fakeMapper;
    private readonly IImageService _fakeImageService;
    private readonly ITokenService _fakeJwtService;
    public ArticleServiceTests()
    {
        _fakeArticleRepository = A.Fake<IArticleRepository>();
        _fakeImageService = A.Fake<IImageService>();
        _fakeJwtService = A.Fake<ITokenService>();
        _fakeMapper = A.Fake<IMapper>();
        _articleService = new ArticleService(_fakeArticleRepository, _fakeImageService, _fakeMapper, _fakeJwtService);
    }

    [Fact]
    public async Task GetAllArticlesAsync_ShouldReturnPaginatedArticlesOrderedByLikes()
    {
        IEnumerable<Article> expectedArticles = new List<Article>() { new Article(), new Article() };

        IEnumerable<ReturnArticlesDto> expectedDtos = new List<ReturnArticlesDto>() { new ReturnArticlesDto(), new ReturnArticlesDto() };

        A.CallTo(() => _fakeArticleRepository.GetAllArticlesAsync()).Returns(Task.FromResult(expectedArticles));

        A.CallTo(() => _fakeMapper.Map<IEnumerable<ReturnArticlesDto>>(expectedArticles)).Returns(expectedDtos);

        var (actualDtos, nextPage) = await _articleService.GetAllArticlesAsync(1, 2);

        Assert.Equal(expectedDtos, actualDtos);
    }

    [Fact]
    public async Task GetAllArticlesAsync_ReturnEmptyList_WhenNoElements()
    {
        IEnumerable<Article> expectedArticles = new List<Article>();

        IEnumerable<ReturnArticlesDto> expectedDtos = new List<ReturnArticlesDto>();

        A.CallTo(() => _fakeArticleRepository.GetAllArticlesAsync()).Returns(Task.FromResult(expectedArticles));

        A.CallTo(() => _fakeMapper.Map<IEnumerable<ReturnArticlesDto>>(expectedArticles)).Returns(expectedDtos);

        var (actualDtos, nextPage) = await _articleService.GetAllArticlesAsync(1, 2);

        Assert.Empty(actualDtos);
    }

    [Fact]
    public async Task GetArticleAsync_ReturnsArticleDto_WhenArticleExistsAndUserLoggedIn()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        var expectedArticle = new Article { Id = articleId };
        var expectedArticleDto = new ReturnArticleDto();
        var user = new ApplicationUser();
        var expectedArticleLike = new ArticleLike();

        IEnumerable<ArticleTag> expectedArticleTags = new List<ArticleTag> { new ArticleTag(), new ArticleTag() };
        expectedArticle.ArticleTags = expectedArticleTags;

        IEnumerable<Article> expectedSimilarArticles = new List<Article>() { new Article(), new Article() };
        IEnumerable<ReturnArticlesDto> expectedSimilarArticlesDtos = new List<ReturnArticlesDto>() { new ReturnArticlesDto(), new ReturnArticlesDto() };

        A.CallTo(() => _fakeArticleRepository.GetArticleWithIncludesAsync(articleId)).Returns(Task.FromResult(expectedArticle));

        A.CallTo(() => _fakeMapper.Map<ReturnArticleDto>(expectedArticleDto));

        var tags = expectedArticleTags.Select(at => at.Tag);

        A.CallTo(() => _fakeArticleRepository.GetSimilarArticlesAsync(articleId, tags)).Returns(Task.FromResult(expectedSimilarArticles));
        A.CallTo(() => _fakeMapper.Map<IEnumerable<ReturnArticlesDto>>(expectedSimilarArticles)).Returns(expectedSimilarArticlesDtos);

        A.CallTo(() => _fakeJwtService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(user));
        //A.CallTo(() => _fakeArticleRepository.GetArticleLikeAsync(articleId, user.Id)).Returns(Task.FromResult(expectedArticleLike));

        var result = await _articleService.GetArticleAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.True(result.Succeeded);
        Assert.Equal(result.SimilarArticles, expectedSimilarArticlesDtos);
        Assert.True(result.Liked);
    }

    [Fact]
    public async Task GetArticleAsync_ReturnErrorMessage_WhenArticleIsNotFound()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        A.CallTo(() => _fakeArticleRepository.GetArticleWithIncludesAsync(articleId)).Returns(Task.FromResult<Article>(null));

        var result = await _articleService.GetArticleAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.False(result.Succeeded);
        Assert.Equal(result.Message, "المقال غير موجود");
    }

    [Fact]
    public async Task GetArticleAsync_InGuestCase()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        var expectedArticle = new Article { Id = articleId };
        var expectedArticleDto = new ReturnArticleDto();

        IEnumerable<ArticleTag> expectedArticleTags = new List<ArticleTag> { new ArticleTag(), new ArticleTag() };
        expectedArticle.ArticleTags = expectedArticleTags;

        IEnumerable<Article> expectedSimilarArticles = new List<Article>() { new Article(), new Article() };
        IEnumerable<ReturnArticlesDto> expectedSimilarArticlesDtos = new List<ReturnArticlesDto>() { new ReturnArticlesDto(), new ReturnArticlesDto() };

        A.CallTo(() => _fakeArticleRepository.GetArticleWithIncludesAsync(articleId)).Returns(Task.FromResult(expectedArticle));

        A.CallTo(() => _fakeMapper.Map<ReturnArticleDto>(expectedArticleDto));

        var tags = expectedArticleTags.Select(at => at.Tag);

        A.CallTo(() => _fakeArticleRepository.GetSimilarArticlesAsync(articleId, tags)).Returns(Task.FromResult(expectedSimilarArticles));
        A.CallTo(() => _fakeMapper.Map<IEnumerable<ReturnArticlesDto>>(expectedSimilarArticles)).Returns(expectedSimilarArticlesDtos);

        A.CallTo(() => _fakeJwtService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _articleService.GetArticleAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.True(result.Succeeded);
        Assert.False(result.Liked);
    }

    [Fact]
    public async Task LikeAsync_ReturnSuccessMessage_WhenAddingLike()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        var expectedUser = new ApplicationUser();
        var like = new ArticleLike { ArticleId = articleId, ApplicationUserId = expectedUser.Id };

        A.CallTo(() => _fakeJwtService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));

        A.CallTo(() => _fakeArticleRepository.GetArticleLikeAsync(articleId, expectedUser.Id)).Returns(Task.FromResult<ArticleLike>(null));
        
        A.CallTo(() => _fakeArticleRepository.AddLikeAsync(like));

        var result = await _articleService.LikeAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.True(result.Succeeded);
        Assert.Equal(result.Message, "تم اضافة الاعجاب بنجاح");
    }

    [Fact]
    public async Task LikeAsync_ReturnSuccessMessage_WhenRemovingLike()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        var expectedUser = new ApplicationUser();
        var like = new ArticleLike { ArticleId = articleId, ApplicationUserId = expectedUser.Id };

        A.CallTo(() => _fakeJwtService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult(expectedUser));
        A.CallTo(() => _fakeArticleRepository.RemoveLikeAsync(like));

        var result = await _articleService.LikeAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.True(result.Succeeded);
        Assert.Equal(result.Message, "تم ازالة الاعجاب بنجاح");
    }

    [Fact]
    public async Task LikeAsync_ReturnErrorMessage_WhenArticleNotFound()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        A.CallTo(() => _fakeArticleRepository.GetArticleByIdAsync(articleId)).Returns(Task.FromResult<Article>(null));

        var result = await _articleService.LikeAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.False(result.Succeeded);
        Assert.Equal(result.Message, "المقال غير موجود");
    }

    [Fact]
    public async Task LikeAsync_ReturnErrorMessage_WhenUserNotFound()
    {
        var articleId = 1;
        var refreshToken = "fakeToken";

        A.CallTo(() => _fakeJwtService.GetUserByRefreshToken(refreshToken)).Returns(Task.FromResult<ApplicationUser>(null));

        var result = await _articleService.LikeAsync(articleId, refreshToken);

        Assert.NotNull(result);
        Assert.False(result.Succeeded);
        Assert.Equal(result.Message, "Invalid Token.");
    }
}