using FIHS.Interfaces;
using FIHS.Models;

namespace FHIS.Services
{
    public class UserImageService : IImageService<ApplicationUser>
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string DefaultImagePath = "\\images\\No_Image.png";
        private const string ImageFolderPath = "\\images\\";
        public UserImageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public void SetImage(ApplicationUser user, IFormFile? imgFile)
        {
            if (imgFile == null)
            {
                user.ProfilePicture = DefaultImagePath;
            }
            else
            {
                DeleteImage(user);

                var imgGuid = Guid.NewGuid();
                string imgExtension = Path.GetExtension(imgFile.FileName);
                string imgName = imgGuid + imgExtension;
                string imgUrl = ImageFolderPath + imgName;

                user.ProfilePicture = imgUrl;

                string imgPath = _webHostEnvironment.WebRootPath + imgUrl;
                using var imgStream = new FileStream(imgPath, FileMode.Create);
                imgFile.CopyTo(imgStream);
            }
        }
        public void DeleteImage(ApplicationUser user)
        {
            if (!string.IsNullOrEmpty(user.ProfilePicture) || user.ProfilePicture != DefaultImagePath) 
            {
                var imgOldPath = _webHostEnvironment.WebRootPath + user.ProfilePicture;
                if (File.Exists(imgOldPath))
                {
                    File.Delete(imgOldPath);
                }
            }
        }
    }
}
