using FIHS.Dtos.AuthModels;
using FIHS.Models.AuthModels;
using System.IdentityModel.Tokens.Jwt;

namespace FIHS.Interfaces.IUser;

public interface ITokenService
{
    Task<ApplicationUser?> GetUserByRefreshToken(string refreshToken);
    Task<AuthModel> CreateAuthModel(ApplicationUser user);
}