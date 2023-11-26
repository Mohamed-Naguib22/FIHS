using FIHS.Models;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Interfaces
{
    public interface IImageService
    {
        public string SetImage(string ImgUrl, IFormFile? imgFile);
        public void DeleteImage(string? ImgUrl);
    }
}
