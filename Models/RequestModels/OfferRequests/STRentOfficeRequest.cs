using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.RequestModels
{
    public class STRentOfficeRequest : BaseOfferRequest
    {
        // Offer Detailes
        public DateTime FreeDate { get; set; }

        // Property Detailes
        public int Floor { get; set; }
        public bool Balcony { get; set; }
        public bool Terrace { get; set; }

        public static explicit operator Offer(STRentOfficeRequest input)
        {
            var offer = new Offer();
            offer = (Offer)((BaseOfferRequest)input);

            // Offer Detailes
            var offerDetailes = new STRentOfferDetailes();
            offerDetailes.FreeDate = input.FreeDate;
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
