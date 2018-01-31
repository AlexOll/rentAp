using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class SaleOfferDetailes : BaseOfferDetailes
    {
        [Required]
        public string Documents { set; get; }
    }
}
