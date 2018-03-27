using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class OfferPhoto
    {
        [Key]
        public Guid Id { get; set; } = new Guid();
        public Guid OfferId { get; set; }
        public string Url { get; set; }
        public Guid PhotoHash { get; set; }
    }
}
