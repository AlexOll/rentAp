using RentApp.Models.ResponseModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public Guid ActivationCode { get; set; } = Guid.NewGuid();
        public bool IsAlive { get; set; } = true;
        public bool IsActivated { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public static explicit operator AuthenticationResponse(User model)
        {
            return new AuthenticationResponse(model);
        }
    }

}