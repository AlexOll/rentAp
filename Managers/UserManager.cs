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
                Message = "Activation code failed"
            };
        }

        internal BaseResponse Create(User item)
        {
            var isEmailExist = UserCache.AliveUsers
                .Any(a => a.Email == item.Email);

            if (isEmailExist)
            {
                return new BaseResponse
                {
                    Message = "Email exists"
                };
            }

            var isUserNameExist = UserCache.AliveUsers
                .Any(a => a.Username == item.Username);

            if (isUserNameExist)
            {
                return new BaseResponse
                {
                    Message = "Username exists"
                };
            }

            item.Id = Guid.NewGuid();
            item.CreateDate = DateTime.Now;
            item.IsAlive = true;
            item.ActivationCode = Guid.NewGuid();

            _userRepository.Create(item);

            var request = new HttpContextAccessor();
            var path = string.Format("{0}://{1}", request.HttpContext.Request.Scheme, request.HttpContext.Request.Host);

            Task.Factory.StartNew(() => SendEmailAsync(item, path));

            return new BaseResponse();
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
                        Message = "Account is not activated. Check your email - " + foundUser.Email
                    };
            }
            return new BaseResponse
            {
                Message = "Account not exists"
            };
        }

        private void SendEmailAsync(User user, string baseUrlPath)
        {
            var sb = new StringBuilder();
            sb.AppendFormat("Hello {0} {1},", user.FirstName, user.LastName);
            sb.Append("<br /><br />Please click the following link to activate your account");
            sb.AppendFormat(
                "<br /><a href = '{0}{1}{2}'>Click here to activate your account.</a>",
                baseUrlPath,
                @"/api/authentication/",
                user.ActivationCode);
            sb.Append("<br /><br />Thanks");

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Rent App", "renty.application@gmail.com"));
            emailMessage.To.Add(new MailboxAddress(user.Username, user.Email));
            emailMessage.Subject = "RentApp activation link";
            emailMessage.Body = new TextPart("html") { Text = sb.ToString() };

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                client.Connect("smtp.gmail.com", 465, SecureSocketOptions.SslOnConnect);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("renty.application@gmail.com", "renty.Pass");
                client.Send(emailMessage);
                client.Disconnect(true);
            }
        }

    }
}
