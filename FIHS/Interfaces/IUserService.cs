using FIHS.Dtos;

namespace FIHS.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetProfileAsync(string refreshToken);
        Task<UserDto> UpdateProfileAsync(string refreshToken, UpdateProfileModel model);
        Task<bool> DeleteAccountAsync(string refreshToken);
        Task<bool> SetImageAsync(string refreshToken, IFormFile imgFile);
        Task<bool> DeleteImageAsync(string refreshToken);
    }
}
