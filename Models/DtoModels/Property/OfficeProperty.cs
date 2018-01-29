using System;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Property
{
    public class OfficeProperty : Property
    {
        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }

        public OfficeProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {
            WithFurniture = request.WithFurniture;
            WithBalcony = request.WithBalcony;
            WithParking = request.WithParking;
        }

        public static explicit operator OfficeProperty(CreateOfferRequest v)
        {
            throw new NotImplementedException();
        }
    }
}
