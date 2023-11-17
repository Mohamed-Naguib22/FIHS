using FIHS.Models;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Interfaces
{
    public interface IImageService<T> where T : class
    {
        public void SetImage(T model, IFormFile? imgFile);
        public void DeleteImage(T model);
    }
}
