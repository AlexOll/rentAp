using System;
using System.Collections.Generic;
using RentApp.Models.Structs;
using RentApp.Models.DbModels;

namespace RentApp.Models.RequestModels
{
    public abstract class BaseOfferRequest
    {
        public PropertyType PropertyType { get; set; }
        public ServiceType ServiceType { get; set; }
        
        public string Description { get; set; }
        public double Area { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        //public List<string> PhotoURLs { get; set; } = new List<string>();
        //public List<RealEstatePhoto> Photos { get; set; }

        public double Price { get; set; }

        public static explicit operator Offer(BaseOfferRequest input)
        {
            var offer = new Offer();
            offer.PropertyType = input.PropertyType;
            offer.ServiceType = input.ServiceType;
            offer.Description = input.Description;
            offer.Area = input.Area;
            offer.Lat = input.Lat;
            offer.Lng = input.Lng;
            //offer.PhotoURLs = input.PhotoURLs;
            offer.Price = input.Price;

            offer.OfferDetailes = null;
            offer.RealEstateDetailes = null;

            return offer;
        }
    }
}
