using FIHS.Models;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Interfaces
{
    public interface IImageService
    {
        public string SetImage(IFormFile imgFile, string? ImgUrl = null);
        public void DeleteImage(string? ImgUrl);
    }
}
