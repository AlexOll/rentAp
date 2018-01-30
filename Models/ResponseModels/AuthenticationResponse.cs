using RentApp.Models.Cache;
using RentApp.Models.Structs;
using RentApp.Utilities;
using System;

namespace RentApp.Models.ResponseModels
{
    public class AuthenticationResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Phonenumber { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Name { get; set; }
        public string ProfileImageURL { get; set; }
        public DateTime LastOnlineDateTime { get; set; }
        

        public AuthenticationResponse(UserCacheItem model)
        {
            Id = model.Id;
            Phonenumber = model.Phonenumber;
            Email = model.Email;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
            Name = model.Firstname+" "+ model.Lastname;

            var imageUtility = new ImageUtility(PhotoType.Profile);
            ProfileImageURL = imageUtility.GetUploadedImageUrl(model.ProfileImageId);

            LastOnlineDateTime = model.LastEntranceDateTime;
        }
    }
}
