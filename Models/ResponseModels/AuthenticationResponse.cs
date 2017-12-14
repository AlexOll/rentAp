using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class AuthenticationResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Phonenumber { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public AuthenticationResponse(User model)
        {
            Id = model.Id;
            Phonenumber = model.Phonenumber;
            Email = model.Email;
            Firstname = model.Firstname;
            Lastname = model.Lastname;
        }
    }
}
