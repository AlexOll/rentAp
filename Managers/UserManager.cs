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
        private UserCache _userCache;

        public UserManager(UserRepository userRepository, UserCache userCache)
        {
            _userRepository = userRepository;
            _userCache = userCache;
        }

        internal BaseResponse ActivateAccountByGuid(Guid value)
        {
            var foundUser = UserCache.AliveUsers
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
            var isEmailExist = UserCache.AliveUsers.Any(a => a.Email == item.Email);

            if (isEmailExist)
            {
                return new BaseResponse
                {
                    Message = "Email exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            var isUserNameExist = UserCache.AliveUsers.Any(a => a.Username == item.Username);

            if (isUserNameExist)
            {
                return new BaseResponse
                {
                    Message = "Username exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }

            item.Id = Guid.NewGuid();
            item.CreateDate = DateTime.Now;
            item.IsAlive = true;
            item.ActivationCode = Guid.NewGuid();

            _userRepository.Create(item);

            var emailManager = new EmailManager(item);
            emailManager.SendActivationEmail();

            return new BaseResponse();
        }

        internal BaseResponse ResendActivationCode(string email)
        {
            var foundUser = UserCache.AliveUsers.FirstOrDefault(a => a.Email == email && !a.IsActivated);

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
                    Message = "Username not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }

        internal void RemindPasswordByEmail(string email)
        {
            var foundUser = UserCache.AliveUsers.FirstOrDefault(a => a.Email == email);

            if (foundUser != null)
            {
                var newPassword = PasswordManager.GenerateRandomPassword();
                foundUser.Password = newPassword;

                var emailManager = new EmailManager(foundUser);
                emailManager.SendNewPasswordForUser(newPassword);

                _userRepository.Update(foundUser);
            }
        }

        internal bool CheckEmailAsync(string value)
        {
            return UserCache.AliveUsers.Any(a => a.Email == value);
        }

        internal bool CheckUsername(string value)
        {
            return UserCache.AliveUsers.Any(a => a.Username == value);
        }

        internal BaseResponse Authenticate(AuthenticationRequest inputUser)
        {
            var foundUser = UserCache.AliveUsers
                    .FirstOrDefault(a =>
                        a.Username == inputUser.Username &&
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
