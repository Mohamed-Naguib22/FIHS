using FIHS.Dtos;

namespace FIHS.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> UpdateProfileAsync(string userId, UpdateProfileModel model);
        Task<bool> DeleteAccountAsync(string userId);
        Task<bool> SetImageAsync(string userId, IFormFile imgFile);
        Task<bool> DeleteImageAsync(string userId);
    }
}
