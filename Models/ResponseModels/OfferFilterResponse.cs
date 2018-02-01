using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
using RentApp.Models.Structs;
using RentApp.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Models.ResponseModels
{
    public class OfferFilterResponse : IOffer
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public List<string> PhotoURLs { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public Guid UserId { get; set; }
        public OfferType OfferType { get; set; }
        public PropertyType PropertyType { get; set; }
        public List<PropertyPhoto> PropertyPhotos { get; set; }
        public double? Area { get; set; }
        public int? RoomsQuantity { get; set; }
        public int? FloorNumber { get; set; }
        public int? Payments { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTill { get; set; }
        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }
        public bool? AllowPets { get; set; }
        public bool? AllowChildren { get; set; }

        public OfferFilterResponse(Offer model)
        {
            Id = model.Id;
            Address = model.Address;
            Description = model.Description;
            Price = model.Price;
            var imageUtility = new ImageUtility(PhotoType.Profile);

            PhotoURLs = model.PropertyPhotos.Select(p => p.Url).ToList();
            Lat = model.Lat;
            Lng = model.Lng;
        }

        public static explicit operator OfferFilterResponse(Offer model)
        {
            return new OfferFilterResponse(model);
        }
    }
}
