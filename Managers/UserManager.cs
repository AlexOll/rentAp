using RentApp.Repositories;
using System;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using Microsoft.AspNetCore.Http;
using RentApp.Cache;
using System.Linq;
using RentApp.Utilities;
using RentApp.Models.Interfaces;

namespace RentApp.Managers
{
    public class UserManager
    {
        private UserRepository _userRepository;

        public UserManager(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        internal BaseResponse Create(User item)
        {
            var isEmailExist = UserCache.CachedItems.Values.Any(a => a.Email == item.Email);

            if (isEmailExist)
            {
                return new BaseResponse
                {
                    Message = "Email exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            var isPhoneNumberExist = UserCache.CachedItems.Values.Any(a => a.Phonenumber == item.Phonenumber);

            if (isPhoneNumberExist)
            {
                return new BaseResponse
                {
                    Message = "Phone number allready exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            _userRepository.Create(item);

            var emailManager = new EmailUtility((IUser)item);
            emailManager.SendActivationEmail();

            return new BaseResponse();
        }

        internal void UpdateOnlineStatus(Guid value)
        {
            UserCache.CachedItems[value].LastOnlineDateTime = DateTime.Now;
            //UserCache.CachedItems[value].ConnectionId = Context.ConnectionId;
        }

        internal BaseResponse Update(UpdateUserRequest item)
        {
            var isAccExist = UserCache.CachedItems.ContainsKey(item.Id);

            if (!isAccExist)
            {
                return new BaseResponse
                {
                    Message = "Account not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
            else
            {
                var cacheUser = UserCache.CachedItems[item.Id];
                if (cacheUser.Email != item.Email || cacheUser.Password != item.Password)
                {
                    return new BaseResponse
                    {
                        Message = "Password doesn't match",
                        ResponseCode = StatusCodes.Status406NotAcceptable
                    };
                }
            }

            var isPhoneNumberExist = UserCache.CachedItems.Values
                .Any(a => !string.IsNullOrEmpty(a.Phonenumber)
                    && a.Phonenumber == item.Phonenumber
                    && a.Id != item.Id);

            if (isPhoneNumberExist)
            {
                return new BaseResponse
                {
                    Message = "Phone number allready exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            var foundUser = UserCache.CachedItems[item.Id];

            var imageUtility = new ImageUtility();
            var imageId = imageUtility.UploadImage(foundUser.ProfileImageId, item.ProfileImageURL);

            foundUser.Firstname = item.Firstname;
            foundUser.Lastname = item.Lastname;
            foundUser.Phonenumber = item.Phonenumber;
            foundUser.ProfileImageId = imageId;

            _userRepository.Update(foundUser.GetDbModel());

            return (AuthenticationResponse)UserCache.CachedItems[item.Id];
        }

        internal bool CheckEmail(string value)
        {
            return UserCache.CachedItems.Values.Any(a => a.Email == value);
        }

        internal bool CheckPhoneNumber(string value)
        {
            return UserCache.CachedItems.Values.Any(a => a.Phonenumber == value);
        }

        
    }
}
