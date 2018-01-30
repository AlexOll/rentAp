
using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;

namespace RentApp.Models.Interfaces
{
    public interface IOffer
    {
        Guid Id { get; set; }
        OfferType OfferType { get; set; }
        PropertyType PropertyType { get; set; }
        string Address { get; set; }
        double Lat { get; set; }
        double Lng { get; set; }
        int Price { get; set; }
        List<PropertyPhoto> PropertyPhotos { get; set; }
        double? Area { get; set; }
        int? RoomsQuantity { get; set; }
        int? FloorNumber { get; set; }
        int? Payments { get; set; }
        DateTime? AvailableFrom { get; set; }
        DateTime? AvailableTill { get; set; }
        bool? WithFurniture { get; set; }
        bool? WithBalcony { get; set; }
        bool? WithParking { get; set; }
        bool? AllowPets { get; set; }
        bool? AllowChildren { get; set; }
        string Description { get; set; }
    }
}
