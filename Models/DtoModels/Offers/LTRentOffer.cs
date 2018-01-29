using System;
using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Offers
{
    public class LTRentOffer : Offer
    {
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTill { get; set; }

        public LTRentOffer(CreateOfferRequest request)
                   : base(request.Price)
        {
            AvailableFrom = request.AvailableFrom;
            AvailableTill= request.AvailableTill;
        }

        public static explicit operator LTRentOffer(CreateOfferRequest request)
        {
            return new LTRentOffer(request);
        }
    }
}
