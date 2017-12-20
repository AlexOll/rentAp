using Microsoft.AspNetCore.Http;
using System;

namespace RentApp.Models.DbModels
{
    public class UpdateUserRequest
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public string ProfileImageURL { get; set; }
    }
}