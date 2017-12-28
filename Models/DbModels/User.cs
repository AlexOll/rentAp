using RentApp.Models.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class User : IDbModel, IUser
    {
        [Key]
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public Guid? ProfileImageId { get; set; }
        public Guid ActivationCode { get; set; }
        public bool IsAlive { get; set; } = true;
        public bool IsActivated { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime LastEntranceDateTime { get; set; }
    }
}