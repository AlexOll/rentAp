﻿using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using RentApp.Models.DbModels;
using System.Text;
using System;
using Microsoft.AspNetCore.Http;

namespace RentApp.Utilities
{
    public class EmailManager
    {
        private User _user;

        public EmailManager(User user)
        {
            _user = user;
        }

        internal void SendActivationEmail()
        {
            var request = new HttpContextAccessor();
            var path = string.Format("{0}://{1}", request.HttpContext.Request.Scheme, request.HttpContext.Request.Host);

            var sb = new StringBuilder();
            sb.AppendFormat("Hello {0} {1},", _user.FirstName, _user.LastName);
            sb.Append("<br /><br />Please click the following link to activate your account");
            sb.AppendFormat(
                "<br /><a href = '{0}{1}{2}'>Click here to activate your account.</a>",
                path,
                @"/api/authentication/",
                _user.ActivationCode);
            sb.Append("<br /><br />Thanks");

            SendMessage(sb.ToString());
        }

        internal void SendNewPasswordForUser(string newPassword)
        {
            var sb = new StringBuilder();
            sb.AppendFormat("Hello {0} {1},", _user.FirstName, _user.LastName);
            sb.AppendFormat("<br /><br />Your temporary password is - {0}", newPassword);

            SendMessage(sb.ToString());
        }

        private void SendMessage(string body)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Rent App", "renty.application@gmail.com"));
            emailMessage.To.Add(new MailboxAddress(_user.Username, _user.Email));
            emailMessage.Subject = "RentApp activation link";
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
