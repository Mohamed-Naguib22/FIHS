using FIHS.Dtos;
using FIHS.Models;

namespace FIHS.Interfaces
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAysnc(RegisterModel model);
        Task<AuthModel> LoginAsync(TokenrRequestModel model);
        Task<AuthModel> ResetPasswordAsync(string userId, ResetPasswordModel passwordDto);
        Task<string> AddRoleAysnc(AddRoleModel model);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
