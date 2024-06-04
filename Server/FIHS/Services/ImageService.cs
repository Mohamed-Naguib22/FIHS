using FIHS.Interfaces;
using FIHS.Models;

namespace FHIS.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string IMAGE_FOLDER_PATH = "\\images\\";
        private const string DEFAULT_USER_IMAGE =  "Default_User_Image.png";
        public ImageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public string SetImage(IFormFile imgFile, string? oldImgUrl = null)
        {
            DeleteImage(oldImgUrl);

            var imgGuid = Guid.NewGuid();
            string imgExtension = Path.GetExtension(imgFile.FileName);
            string imgName = imgGuid + imgExtension;
            string imgUrl = IMAGE_FOLDER_PATH + imgName;

            string imgPath = _webHostEnvironment.WebRootPath + imgUrl;
            using var imgStream = new FileStream(imgPath, FileMode.Create);
            imgFile.CopyTo(imgStream);
            return imgUrl;
        }
        public void DeleteImage(string? imgUrl)
        {
            if (!string.IsNullOrEmpty(imgUrl) && !imgUrl.Contains(DEFAULT_USER_IMAGE) && !imgUrl.Contains("No_Image.jpg")) 
            {
                var imgOldPath = _webHostEnvironment.WebRootPath + imgUrl;

                if (File.Exists(imgOldPath))
                {
                    File.Delete(imgOldPath);
                }
            }
        }
    }
}
