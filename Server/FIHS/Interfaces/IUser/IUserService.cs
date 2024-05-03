using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;

namespace FIHS.Interfaces.IUser
{
    public interface IUserService
    {
        Task<AuthModel> GetProfileAsync(string refreshToken);
        Task<AuthModel> UpdateProfileAsync(string refreshToken, UpdateProfileModel model);
        Task<AuthModel> ChangePasswordAsync(string refreshToken, ChangePasswordModel passwordDto);
        Task<AuthModel> DeleteAccountAsync(string refreshToken);
        Task<AuthModel> SetImageAsync(string refreshToken, IFormFile imgFile);
        Task<AuthModel> DeleteImageAsync(string refreshToken);
        Task<bool> IsUserExist(string userId);
    }
}
