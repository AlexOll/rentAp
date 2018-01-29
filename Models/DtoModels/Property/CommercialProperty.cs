using System;
using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Property
{
    public class CommercialProperty : Property
    {
        public int? FloorNumber { get; set; }

        public CommercialProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {
            FloorNumber = request.FloorNumber;
        }


        public static explicit operator CommercialProperty(CreateOfferRequest request)
        {
            return new CommercialProperty(request);
        }
    }
}
