using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
     public class Offer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; } = DateTime.Now;
        public bool IsAlive { get; set; } = true;

        public RealEstateType RealEstateType { get; set; }
        public BaseRealEstateDetailes RealEstateDetailes { get; set; }
        public OfferType OfferType { get; set; }
        public BaseOfferDetailes OfferDetailes { get; set; }

        public string Description { get; set; }
        public double Area { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public List<RealEstatePhoto> Photos { get; set; }

        public double Price { get; set; }
    }
}
