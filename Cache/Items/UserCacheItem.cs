using RentApp.Models.ResponseModels;
using System;
using RentApp.Models.Interfaces;

namespace RentApp.Models.DbModels
{
    public class UserCacheItem : IUser
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public Guid? ProfileImageId { get; set; }
        public Guid ActivationCode { get; set; }
        public bool IsAlive { get; set; }
        public bool IsActivated { get; set; }
        public DateTime CreateDateTime { get; set; }

        public DateTime LastOnlineDateTime { get; set; } = DateTime.Now;
        public string ConnectionId { get; set; }

        public UserCacheItem(User model)
        {
            Id = model.Id;
            Email = model.Email;
            Phonenumber = model.Phonenumber;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
            Password = model.Password;
            ProfileImageId = model.ProfileImageId;
            ActivationCode = model.ActivationCode;
            IsAlive = model.IsAlive;
            IsActivated = model.IsActivated;
            CreateDateTime = model.CreateDateTime;
        }

        public static explicit operator AuthenticationResponse(UserCacheItem model)
        {
            return new AuthenticationResponse(model);
        }
        public User GetDbModel()
        {
            var user = new User();
            user.Id = Id;
            user.Email = Email;
            user.Phonenumber = Phonenumber;
            user.Firstname = Firstname;
            user.Lastname = Lastname;
            user.Password = Password;
            user.ProfileImageId = ProfileImageId;
            user.ActivationCode = ActivationCode;
            user.IsAlive = IsAlive;
            user.IsActivated = IsActivated;
            user.IsAlive = IsAlive;
            return user;
        }
    }
}