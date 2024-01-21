using FIHS.Dtos;
using FIHS.Models;
using FIHS.Models.Auth_Models;

namespace FIHS.Interfaces
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAysnc(RegisterModel model);
        Task<AuthModel> LoginAsync(TokenrRequestModel model);
        Task<AuthModel> VerifyAccountAsync(VerifyAccountModel model);
        Task<ResetTokenModel> ForgetPasswordAsync(ForgetPasswordModel model);
        Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model);
        Task<AuthModel> ChangePasswordAsync(string userId, ChangePasswordModel passwordDto);
        Task<string> AddRoleAysnc(AddRoleModel model);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
