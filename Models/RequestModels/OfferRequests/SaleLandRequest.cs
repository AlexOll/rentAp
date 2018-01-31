using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.RequestModels
{
    public class SaleLandRequest : BaseOfferRequest
    {
        // Offer Detailes
        public string Documents { set; get; }

        // Property Detailes

        public static explicit operator Offer(SaleLandRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new SaleOfferDetailes();
            offerDetailes.Documents = input.Documents;
            offer.OfferDetailes = offerDetailes;

            // Property Detailes
            var propertyDetailes = new LandDetailes();
            offer.RealEstateDetailes = propertyDetailes;

            return offer;
        }
    }
}
