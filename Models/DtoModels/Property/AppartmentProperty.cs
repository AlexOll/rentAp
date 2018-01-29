using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Property
{
    public class AppartmentProperty : Property
    {
        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }
        public int? RoomsQuantity { get; set; }

        public AppartmentProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {
            RoomsQuantity = request.RoomsQuantity;
            WithFurniture = request.WithFurniture;
            WithBalcony = request.WithBalcony;
            WithParking = request.WithParking;
        }


        public static explicit operator AppartmentProperty(CreateOfferRequest request)
        {
            return new AppartmentProperty(request);
        }
    }
}
