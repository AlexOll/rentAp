using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class AuthenticationResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public AuthenticationResponse(User model)
        {
            Id = model.Id;
            PhoneNumber = model.PhoneNumber;
            Email = model.Email;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
        }
    }
}
