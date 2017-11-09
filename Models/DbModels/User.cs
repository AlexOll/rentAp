using RentApp.Models.ResponseModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public bool IsAlive { get; set; }
        public DateTime CreateDate { get; set; }

        public static explicit operator AuthenticationResponse(User model)
        {
            return new AuthenticationResponse(model);
        }
    }

}