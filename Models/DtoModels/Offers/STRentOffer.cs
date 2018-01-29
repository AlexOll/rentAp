using RentApp.Models.RequestModels;
using System;

namespace RentApp.Models.DtoModels.Offers
{
    public class STRentOffer : Offer
    {
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTill { get; set; }
        public bool? AllowPets { get; set; }
        public bool? AllowChildren { get; set; }

        public STRentOffer(CreateOfferRequest request)
                   : base(request.Price)
        {
            AvailableFrom = request.AvailableFrom;
            AvailableTill = request.AvailableTill;
            AllowPets = request.AllowPets;
            AllowChildren = request.AllowChildren;
        }

        public static explicit operator STRentOffer(CreateOfferRequest request)
        {
            return new STRentOffer(request);
        }
    }
}
