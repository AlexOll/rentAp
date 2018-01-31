using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class STRentOfferDetailes : BaseOfferDetailes
    {
        [Required]
        public DateTime FreeDate { get; set; }
    }
}