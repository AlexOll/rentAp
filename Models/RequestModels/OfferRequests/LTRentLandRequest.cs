using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.RequestModels
{
    public class LTRentLandRequest : BaseOfferRequest
    {
        // Offer Detailes
        public DateTime FreeDate { get; set; }

        // Property Detailes

        public static explicit operator Offer(LTRentLandRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new LTRentOfferDetailes();
            offerDetailes.FreeDate = input.FreeDate;
            offer.OfferDetailes = offerDetailes;

            // Property Detailes
            var propertyDetailes = new LandDetailes();
            offer.RealEstateDetailes = propertyDetailes;

            return offer;
        }
    }
}
