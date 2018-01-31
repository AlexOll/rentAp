using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class LTRentOfferDetailes : BaseOfferDetailes
    {
        [Required]
        public DateTime FreeDate { get; set; }
    }
}
