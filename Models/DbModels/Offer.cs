using RentApp.Models.Interfaces;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public class Offer2
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public RealEstateType RealEstateType { get; set; }
        public IRealEstateDetails RealEstateDetails { get; set; }
        public bool IsAlive { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }

    public class Offer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        //[Required]
        public DateTime CreateDate { get; set; }
        //[Required]
        public DateTime UpdateDate { get; set; }
        //[Required]
        public bool IsAlive { get; set; }

        //[Required]
        public RealEstateType RealEstateType { get; set; }
        //[Required]
        public IRealEstateDetails RealEstateDetailes { get; set; }
        //[Required]
        public OfferType OfferType { get; set; }
        //[Required]
        public IOfferDetails OfferDetailes { get; set; }

        //[Required]
        public string Description { get; set; }
        //[Required]
        public double Area { get; set; }
        //[Required]
        public double Lat { get; set; }
        //[Required]
        public double Lng { get; set; }
        //[Required]
        public List<RealEstatePhoto> Photos { get; set; }

        //[Required]
        public double Price { get; set; }
    }
}
