using Microsoft.AspNetCore.Http;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace RentApp.Utilities
{
    public class ImageUtility
    {
        private const string RelativeImgPathPattern = @"wwwroot/img/profile/{0}.jpg";
        private const string AbsouleteImgPathPattern = @"{0}://{1}/img/profile/{2}.jpg";

        private void DeletePreviousImage(Guid? profileImageId)
        {
            if (profileImageId.HasValue)
            {
                var path = string.Format(RelativeImgPathPattern, profileImageId);
                if (File.Exists(path))
                    File.Delete(path);
            }
        }

        private Guid? GetUploadedImageId(string profileImageSource)
        {
            Guid? result = null;
            var splitArr = profileImageSource.Split("base64,");

            if (splitArr.Length == 2)
            {
                byte[] bytes = Convert.FromBase64String(splitArr[1]);
                using (var stream = new MemoryStream(bytes))
                using (var image = Image.FromStream(stream))
                {
                    result = Guid.NewGuid();
                    var path = string.Format(RelativeImgPathPattern, result);
                    image.Save(path, ImageFormat.Jpeg);
                }
            }
            return result;
        }

        internal Guid? UpdateImageId(Guid? oldImageId, string newImageSource)
        {
            if(oldImageId.HasValue && newImageSource.Contains(oldImageId.ToString()))
            {
                return oldImageId;
            }
            DeletePreviousImage(oldImageId);
            return GetUploadedImageId(newImageSource);
        }

        internal string GetUploadedImageUrl(Guid? profileImageId)
        {
            var result = string.Empty;
            if (profileImageId.HasValue)
            {
                var request = new HttpContextAccessor();
                result = string.Format(AbsouleteImgPathPattern,
                    request.HttpContext.Request.Scheme,
                    request.HttpContext.Request.Host,
                    profileImageId);
            }

            return result;
        }
    }
}
