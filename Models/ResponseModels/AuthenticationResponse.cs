using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class AuthenticationResponse
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public AuthenticationResponse(User model)
        {
            Id = model.Id;
            Login = model.Login;
            FirstName = model.FirstName;
            LastName = model.LastName;
        }
    }
}
