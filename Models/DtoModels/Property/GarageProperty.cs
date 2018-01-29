using System;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.Structs;

namespace RentApp.Models.DtoModels.Property
{
    public class GarageProperty : Property
    {
        public ConstructionMaterialType ConstructionMaterialType { get; set; }

        public GarageProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {
        }

        public static explicit operator GarageProperty(CreateOfferRequest request)
        {
            return new GarageProperty(request);
        }
    }
}
