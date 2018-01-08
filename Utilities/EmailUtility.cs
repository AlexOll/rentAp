using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Text;
using Microsoft.AspNetCore.Http;
using RentApp.Models.Interfaces;

namespace RentApp.Utilities
{
    public class EmailUtility
    {
        private IEmailItem _emailItem;

        public EmailUtility(IEmailItem emailItem)
        {
            _emailItem = emailItem;
        }

        internal void SendActivationEmail()
        {
            var request = new HttpContextAccessor();
            var path = string.Format("{0}://{1}", request.HttpContext.Request.Scheme, request.HttpContext.Request.Host);

            var sb = new StringBuilder();
            sb.AppendFormat("Hello {0} {1},", _emailItem.Firstname, _emailItem.Lastname);
            sb.Append("<br /><br />Please click the following link to activate your account");
            sb.AppendFormat(
                "<br /><a href = '{0}{1}{2}'>Click here to activate your account.</a>",
                path,
                @"/login?activationcode=",
                _emailItem.ActivationCode);
            sb.Append("<br /><br />Thanks");

            SendMessage(sb.ToString(), "RentApp activation link");
        }

        internal void SendNewPasswordForUser()
        {
            var sb = new StringBuilder();
            sb.AppendFormat("Hello {0} {1},", _emailItem.Firstname, _emailItem.Lastname);
            sb.AppendFormat("<br /><br />Your new password is - {0}", _emailItem.Password);

            SendMessage(sb.ToString(), "RentApp new password");
        }

        private void SendMessage(string body, string subject)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Rent App", "renty.application@gmail.com"));
            emailMessage.To.Add(new MailboxAddress(_emailItem.Firstname+" "+_emailItem.Lastname, _emailItem.Email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("html") { Text = body };

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
