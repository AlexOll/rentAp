using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.RequestModels
{
    public class SaleOfficeRequest : BaseOfferRequest
    {
        // Offer Detailes
        public string Documents { set; get; }

        // Property Detailes
        public int Floor { get; set; }
        public bool Balcony { get; set; }
        public bool Terrace { get; set; }

        public static explicit operator Offer(SaleOfficeRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new SaleOfferDetailes();
            offerDetailes.Documents = input.Documents;
            offer.OfferDetailes = offerDetailes;

            // Property Detailes
            var propertyDetailes = new AccommodationDetailes();
            propertyDetailes.Floor = input.Floor;
            propertyDetailes.Balcony = input.Balcony;
            propertyDetailes.Terrace = input.Terrace;
            offer.RealEstateDetailes = propertyDetailes;

            return offer;
        }
    }
}
