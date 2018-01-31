using System;
using RentApp.Models.DbModels;

namespace RentApp.Models.RequestModels
{
    public class LTRentGarageRequest : BaseOfferRequest
    {
        // Offer Detailes
        public DateTime FreeDate { get; set; }

        // Property Detailes
        public string TypeOfGarage { get; set; }

        public static explicit operator Offer(LTRentGarageRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new LTRentOfferDetailes();
            offerDetailes.FreeDate = input.FreeDate;
            offer.OfferDetailes = offerDetailes;

            // Property Detailes
            var propertyDetailes = new GarageDetailes();
            propertyDetailes.TypeOfGarage = input.TypeOfGarage;
            offer.RealEstateDetailes = propertyDetailes;

            return offer;
        }
    }
}
