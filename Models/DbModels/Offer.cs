using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RentApp.Models.Structs;

namespace RentApp.Models.DbModels
{
    public class Offer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public DateTime CreateDate { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
        [Required]
        public bool IsAlive { get; set; }

        [Required]
        public PropertyType PropertyType { get; set; }
        [Required]
        public BaseRealEstateDetailes RealEstateDetailes { get; set; }
        [Required]
        public ServiceType ServiceType { get; set; }
        [Required]
        public BaseOfferDetailes OfferDetailes { get; set; }
        
        [Required]
        public string Description { get; set; }
        [Required]
        public double Area { get; set; }
        [Required]
        public double Lat { get; set; }
        [Required]
        public double Lng { get; set; }
        [Required]
        public List<RealEstatePhoto> Photos { get; set; }

        [Required]
        public double Price { get; set; }
    }
}
