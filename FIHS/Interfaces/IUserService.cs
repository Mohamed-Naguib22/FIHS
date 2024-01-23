using FIHS.Dtos;

namespace FIHS.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetProfileAsync(string refreshToken);
        Task<UserDto> UpdateProfileAsync(string refreshToken, UpdateProfileModel model);
        Task<UserDto> DeleteAccountAsync(string refreshToken);
        Task<UserDto> SetImageAsync(string refreshToken, IFormFile imgFile);
        Task<UserDto> DeleteImageAsync(string refreshToken);
    }
}
