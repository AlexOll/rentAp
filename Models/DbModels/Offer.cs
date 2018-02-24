using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
     public class Offer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsAlive { get; set; }

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
