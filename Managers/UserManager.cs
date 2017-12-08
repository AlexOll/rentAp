using RentApp.Repositories;
using System;
using System.Threading.Tasks;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using System.Text;
using Microsoft.AspNetCore.Http;
using RentApp.Cache;
using System.Linq;
using RentApp.Utilities;

namespace RentApp.Managers
{
    public class UserManager
    {
        private UserRepository _userRepository;

        public UserManager(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        internal BaseResponse ActivateAccountByGuid(Guid value)
        {
            var foundUser = UserCache.CachedItems.Values
                .FirstOrDefault(f => f.ActivationCode == value && !f.IsActivated);

            if (foundUser != null)
            {
                foundUser.IsActivated = true;
                _userRepository.Update(foundUser);
                return (AuthenticationResponse)foundUser;
            }

            return new BaseResponse
            {
                Message = "Activation code failed",
                ResponseCode = StatusCodes.Status406NotAcceptable
            };
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

            var isPhoneNumberExist = UserCache.CachedItems.Values.Any(a => a.PhoneNumber == item.PhoneNumber);

            if (isPhoneNumberExist)
            {
                return new BaseResponse
                {
                    Message = "Phone number exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            _userRepository.Create(item);

            var emailManager = new EmailManager(item);
            emailManager.SendActivationEmail();

            return new BaseResponse();
        }

        internal BaseResponse ResendActivationCode(string email)
        {
            var foundUser = UserCache.CachedItems.Values.FirstOrDefault(a => a.Email == email && !a.IsActivated);

            if (foundUser != null)
            {
                foundUser.ActivationCode = Guid.NewGuid();

                var emailManager = new EmailManager(foundUser);
                emailManager.SendActivationEmail();

                _userRepository.Update(foundUser);

                return new BaseResponse();
            }
            else
            {
                return new BaseResponse
                {
                    Message = "Account not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }

        internal void RemindPasswordByEmail(string email)
        {
            var foundUser = UserCache.CachedItems.Values.FirstOrDefault(a => a.Email == email);

            if (foundUser != null)
            {
                var newPassword = PasswordManager.GenerateRandomPassword();
                foundUser.Password = newPassword;

                var emailManager = new EmailManager(foundUser);
                emailManager.SendNewPasswordForUser(newPassword);

                _userRepository.Update(foundUser);
            }
        }

        internal bool CheckEmail(string value)
        {
            return UserCache.CachedItems.Values.Any(a => a.Email == value);
        }

        internal bool CheckPhoneNumber(string value)
        {
            return UserCache.CachedItems.Values.Any(a => a.PhoneNumber == value);
        }

        internal BaseResponse Authenticate(AuthenticationRequest inputUser)
        {
            var foundUser = UserCache.CachedItems.Values
                    .FirstOrDefault(a =>
                        (a.PhoneNumber == inputUser.Input || a.Email == inputUser.Input) &&
                        a.Password == inputUser.Password);

            if (foundUser != null)
            {
                if (foundUser.IsActivated)
                    return (AuthenticationResponse)foundUser;
                else
                    return new BaseResponse
                    {
                        Message = "Account is not activated. Check your email - " + foundUser.Email,
                        ResponseCode = StatusCodes.Status406NotAcceptable
                    };
            }
            return new BaseResponse
            {
                Message = "Account not exists",
                ResponseCode = StatusCodes.Status404NotFound
            };
        }
    }
}
