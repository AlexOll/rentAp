using Microsoft.AspNetCore.Http;
using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using RentApp.Utilities;
using System;
using System.Linq;

namespace RentApp.Managers
{
    public class AuthenticationManager
    {
        private UserRepository _userRepository;

        public AuthenticationManager(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        internal BaseResponse ResendActivationCode(string email)
        {
            var foundUser = UserCache.CachedItems.Values
                .FirstOrDefault(a => a.Email == email && !a.IsActivated);

            if (foundUser != null)
            {
                foundUser.ActivationCode = Guid.NewGuid();

                var emailManager = new EmailUtility(foundUser);
                emailManager.SendActivationEmail();

                _userRepository.Update(foundUser.CreateDbModel());

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
            var foundUser = UserCache.CachedItems.Values
                .FirstOrDefault(a => a.Email == email);

            if (foundUser != null)
            {
                var newPassword = PasswordUtility.GenerateRandomPassword();
                foundUser.Password = newPassword;

                var emailManager = new EmailUtility(foundUser);
                emailManager.SendNewPasswordForUser();

                _userRepository.Update(foundUser.CreateDbModel());
            }
        }
        internal BaseResponse ActivateAccountByGuid(Guid value)
        {
            var foundUser = UserCache.CachedItems.Values
                .FirstOrDefault(f => f.ActivationCode == value && !f.IsActivated);

            if (foundUser != null)
            {
                foundUser.IsActivated = true;
                foundUser.LastEntranceDateTime = DateTime.Now;
                _userRepository.Update(foundUser.CreateDbModel());
                return (AuthenticationResponse)foundUser;
            }

            return new BaseResponse
            {
                Message = "Activation code failed",
                ResponseCode = StatusCodes.Status406NotAcceptable
            };
        }


        internal BaseResponse Authenticate(AuthenticationRequest inputUser)
        {
            var foundUser = UserCache.CachedItems.Values
                    .FirstOrDefault(a =>
                        (a.Phonenumber == inputUser.Input || a.Email == inputUser.Input) &&
                        a.Password == inputUser.Password);

            if (foundUser != null)
            {
                if (foundUser.IsActivated)
                {
                    foundUser.LastEntranceDateTime = DateTime.Now;
                    _userRepository.Update(foundUser.CreateDbModel());
                    return (AuthenticationResponse)foundUser;
                }
                else
                    return new BaseResponse
                    {
                        Message = "Account is not activated. Check your email - " + foundUser.Email,
                        ResponseCode = StatusCodes.Status406NotAcceptable
                    };
            }
            else
                return new BaseResponse
                {
                    Message = "Account not exists",
                    ResponseCode = StatusCodes.Status404NotFound
                };
        }
    }
}
