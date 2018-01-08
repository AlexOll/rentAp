using System;

namespace RentApp.Models.DbModels
{
    public class CreateUserRequest
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }

        public static explicit operator User(CreateUserRequest input)
        {
            var user = new User();
            user.Id = Guid.NewGuid();
            user.Email = input.Email;
            user.Firstname = input.Firstname;
            user.Lastname = input.Lastname;
            user.Password = input.Password;
            user.ActivationCode = Guid.NewGuid();
            return user;
        }
    }
}