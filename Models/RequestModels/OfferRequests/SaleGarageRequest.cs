using System;
using RentApp.Models.DbModels;

namespace RentApp.Models.RequestModels
{
    public class SaleGarageRequest : BaseOfferRequest
    {
        // Offer Detailes
        public string Documents { set; get; }

        // Property Detailes
        public string TypeOfGarage { get; set; }

        public static explicit operator Offer(SaleGarageRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new SaleOfferDetailes();
            offerDetailes.Documents = input.Documents;
            offer.OfferDetailes = offerDetailes;

            // Property Detailes
            var propertyDetailes = new GarageDetailes();
            propertyDetailes.TypeOfGarage = input.TypeOfGarage;
            offer.RealEstateDetailes = propertyDetailes;

            return offer;
        }
    }
}
