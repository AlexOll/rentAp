using RentApp.Models.Structs;
using System;
using System.Collections.Generic;

namespace RentApp.Models.RequestModels
{
    public class OfferFilterRequest
    {
        public OfferType OfferType { get; set; }
        public List<PropertyType> PropertyTypeList { get; set; } = new List<PropertyType>();
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTill { get; set; }
        public int? RoomsQuantity { get; set; }
        public int? FloorNumber { get; set; }
        public double? Area { get; set; }
        public int? Payments { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTill { get; set; }
        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }
        public bool? AllowPets { get; set; }
        public bool? AllowChildren { get; set; }
    }
}
