using System;
using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Offers
{
    public class RoommateOffer : Offer
    {
        public RoommateOffer(CreateOfferRequest request)
                   : base(request.Price)
        {

        }

        public static explicit operator RoommateOffer(CreateOfferRequest request)
        {
            return new RoommateOffer(request);
        }
    }
}
