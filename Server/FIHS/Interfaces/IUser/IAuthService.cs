using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;

namespace FIHS.Interfaces.IUser
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAysnc(RegisterModel model);
        Task<AuthModel> LoginAsync(TokenrRequestModel model);
        Task<AuthModel> VerifyAccountAsync(VerifyAccountModel model);
        Task<AuthModel> ResendVerificationCodeAsync(EmailModel model);
        Task<ResetTokenModel> ForgetPasswordAsync(EmailModel model);
        Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model);
        Task<string> AddRoleAysnc(AddRoleModel model);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
