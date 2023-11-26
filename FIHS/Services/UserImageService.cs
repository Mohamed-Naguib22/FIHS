using FIHS.Interfaces;
using FIHS.Models;

namespace FHIS.Services
{
    public class UserImageService : IImageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string DefaultImagePath = "\\images\\No_Image.png";
        private const string ImageFolderPath = "\\images\\";
        public UserImageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public string SetImage(string ImgUrl, IFormFile? imgFile)
        {
            if (imgFile == null)
            {
                return DefaultImagePath;
            }
            else
            {
                DeleteImage(ImgUrl??null);

                var imgGuid = Guid.NewGuid();
                string imgExtension = Path.GetExtension(imgFile.FileName);
                string imgName = imgGuid + imgExtension;
                string imgUrl = ImageFolderPath + imgName;


                string imgPath = _webHostEnvironment.WebRootPath + imgUrl;
                using var imgStream = new FileStream(imgPath, FileMode.Create);
                imgFile.CopyTo(imgStream);
                return imgUrl;
            }
        }
        public void DeleteImage(string ImgUrl)
        {
            if (!string.IsNullOrEmpty(ImgUrl) || ImgUrl != DefaultImagePath) 
            {
                var imgOldPath = _webHostEnvironment.WebRootPath + ImgUrl;
                if (File.Exists(imgOldPath))
                {
                    File.Delete(imgOldPath);
                }
            }
        }
    }
}
