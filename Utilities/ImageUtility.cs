using Microsoft.AspNetCore.Http;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace RentApp.Utilities
{
    public class ImageUtility
    {
        private const string ProfileRelativeImgPathPattern = @"wwwroot/img/profile/{0}.jpg";
        private const string ProfileAbsouleteImgPathPattern = @"{0}://{1}/img/profile/{2}.jpg";

        private const string PropertyRelativeImgPathPattern = @"wwwroot/img/flat/{0}.jpg";
        private const string PropertyAbsouleteImgPathPattern = @"{0}://{1}/img/flat/{2}.jpg";

        private string _currentRelativePath;
        private string _currentAbsouletePath;

        public ImageUtility(PhotoType PhotoType)
        {
            switch (PhotoType)
            {
                case PhotoType.Profile:
                    _currentRelativePath = ProfileRelativeImgPathPattern;
                    _currentAbsouletePath = ProfileAbsouleteImgPathPattern;
                    break;
                case PhotoType.Property:
                    _currentRelativePath = PropertyRelativeImgPathPattern;
                    _currentAbsouletePath = PropertyAbsouleteImgPathPattern;
                    break;
                default:
                    throw new ArgumentException();

            }
        }
        private const string base64seperator = "base64";
        public static List<string> ReturnDublicateImages(IEnumerable<string> imageList1, IEnumerable<string> imageList2)
        {
            var result = new List<string>();

            try
            {
                var base64body1List = imageList1.Distinct().ToDictionary(x => x.Split(base64seperator)[1], x => x);
                var base64body2List = imageList2.Distinct().ToDictionary(x => x.Split(base64seperator)[1], x => x);

                base64body1List.Keys.ToList()
                    .ForEach(f =>
                    {
                        if (base64body2List.ContainsKey(f))
                            result.Add(base64body2List[f]);
                    });
            }
            catch (Exception ex)
            {
                throw new BadImageFormatException("Check image source!", ex);
            }

            return result;
        }

        internal Guid? UpdateImageId(Guid? oldImageId, string newImageSource)
        {
            if (oldImageId.HasValue && newImageSource.Contains(oldImageId.ToString()))
            {
                return oldImageId;
            }
            DeletePreviousImage(oldImageId);
            return GetUploadedImageId(newImageSource);
        }

        private void DeletePreviousImage(Guid? profileImageId)
        {
            if (profileImageId.HasValue)
            {
                var path = string.Format(_currentRelativePath, profileImageId);
                if (File.Exists(path))
                    File.Delete(path);
            }
        }

        private Guid GetUploadedImageId(string imageSource)
        {
            var splitArr = imageSource.Split("base64,");

            if (splitArr.Length == 2)
            {
                byte[] bytes = Convert.FromBase64String(splitArr[1]);
                using (var stream = new MemoryStream(bytes))
                using (var image = Image.FromStream(stream))
                {
                    var result = Guid.NewGuid();
                    var path = string.Format(_currentRelativePath, result);
                    image.Save(path, ImageFormat.Jpeg);
                    return result;
                }
            }
            else
                throw new BadImageFormatException();
        }

        internal string GetUploadedImageUrl(Guid? imageId)
        {
            var result = string.Empty;
            if (imageId.HasValue)
            {
                var request = new HttpContextAccessor();
                result = string.Format(_currentAbsouletePath,
                    request.HttpContext.Request.Scheme,
                    request.HttpContext.Request.Host,
                    imageId);
            }

            return result;
        }
    }
}
