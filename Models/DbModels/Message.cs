using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class Message
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserIdTo { get; set; }
        public Guid UserIdFrom { get; set; }
        public string Body { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsAlive { get; set; }
    }
}
