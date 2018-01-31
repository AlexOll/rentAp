
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class RoommateOfferDetailes : BaseOfferDetailes
    {
        [Required]
        public String RommateRules { get; set; }
    }
}