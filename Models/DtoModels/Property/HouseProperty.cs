using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Property
{
    public class HouseProperty : Property
    {

        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }
        public int? RoomsQuantity { get; set; }

        public int? FloorsQuantity { get; set; }

        public HouseProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {
            RoomsQuantity = request.RoomsQuantity;
            WithFurniture = request.WithFurniture;
            WithBalcony = request.WithBalcony;
            WithParking = request.WithParking;
            //FloorsQuantity = request.FloorsQuantity;
        }

        public static explicit operator HouseProperty(CreateOfferRequest request)
        {
            return new HouseProperty(request);
        }
    }
}
