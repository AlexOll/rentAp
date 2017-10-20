using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool IsAlive { get; set; }
    }

}