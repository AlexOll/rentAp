using RentApp.Models.ResponseModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Guid ActivationCode { get; set; }
        public bool IsAlive { get; set; }
        public bool IsActivated { get; set; }
        public DateTime CreateDate { get; set; }

        public static explicit operator AuthenticationResponse(User model)
        {
            return new AuthenticationResponse(model);
        }
    }

}