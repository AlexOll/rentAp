using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using RentApp.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

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
            Address = model.Address;
            Description = model.Description;
            Price = model.Price;
            var imageUtility = new ImageUtility(PhotoType.Profile);

            PhotoURLs = model.PropertyPhotos.Select(p => imageUtility.GetUploadedImageUrl(p.Id)).ToList();
            Lat = model.Lat;
            Lng = model.Lng;
        }

        public static explicit operator OfferFilterResponse(Offer model)
        {
            return new OfferFilterResponse(model);
        }
    }
}
