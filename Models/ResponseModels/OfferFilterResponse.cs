using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.ResponseModels
{
    public class OfferFilterResponse
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public List<string> PhotoURLs { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public OfferFilterResponse(Offer model)
        {
            Id = model.Id;
            //Address = model.RealEstateObject.Address;
            //Description = model.RealEstateObject.Description;
            //Price = model.Price;
            //PhotoURLs = model.RealEstateObject.Photos.Select(p => p.Url).ToList();
            //Lat = model.RealEstateObject.Lat;
            //Lng = model.RealEstateObject.Lng;
        }

        public static explicit operator OfferFilterResponse(Offer model)
        {
            return new OfferFilterResponse(model);
        }
    }
}
