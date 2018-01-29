
using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Property
{
    public class LandProperty : Property
    {
        public LandProperty(CreateOfferRequest request)
            : base(request.Area, request.Lat, request.Lng, request.LocationName, request.PhotoURLs)
        {

        }

        public static explicit operator LandProperty(CreateOfferRequest request)
        {
            return new LandProperty(request);
        }
  
    }
}
