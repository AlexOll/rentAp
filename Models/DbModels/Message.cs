using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class Message 
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserIdTo { get; set; }
        public Guid UserIdFrom { get; set; }
        public string Body { get; set; }
        public bool IsRead { get; set; }

        public MessageType MessageType { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;


    }
}
