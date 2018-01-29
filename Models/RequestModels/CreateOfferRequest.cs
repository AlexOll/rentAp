using RentApp.Models.Structs;
using System;
using System.Collections.Generic;

namespace RentApp.Models.RequestModels
{
    public class CreateOfferRequest
    {
        public OfferType OfferType { get; set; }
        public PropertyType PropertyType { get; set; }
        public string LocationName { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Price { get; set; }
        public List<string> PhotoURLs { get; set; } = new List<string>();
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
        public string Description { get; set; }
    }
}
