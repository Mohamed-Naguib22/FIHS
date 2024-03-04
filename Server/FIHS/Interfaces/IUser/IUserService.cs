using FIHS.Dtos.AuthModels;
using FIHS.Dtos.UserDtos;

namespace FIHS.Interfaces.IUser
{
    public interface IUserService
    {
        Task<UserDto> GetProfileAsync(string refreshToken);
        Task<AuthModel> UpdateProfileAsync(string refreshToken, UpdateProfileModel model);
        Task<AuthModel> ChangePasswordAsync(string refreshToken, ChangePasswordModel passwordDto);
        Task<UserDto> DeleteAccountAsync(string refreshToken);
        Task<AuthModel> SetImageAsync(string refreshToken, IFormFile imgFile);
        Task<UserDto> DeleteImageAsync(string refreshToken);
    }
}
