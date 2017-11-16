using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class AuthenticationResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public AuthenticationResponse(User model)
        {
            Id = model.Id;
            Username = model.Username;
            FirstName = model.FirstName;
            LastName = model.LastName;
        }
    }
}
