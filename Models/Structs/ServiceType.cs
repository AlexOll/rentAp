
using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum ServiceType
    {
        [Description("Offer sale")]
        OfferSale = 1,
        [Description("Rental offer")]
        OfferRental,
        [Description("Offer rommate")]
        OfferRoommate,
        [Description("Sales demand")]
        DemandSale,
        [Description("Demand rental")]
        DemandRental,
        [Description("Demand for roommates")]
        DemandRoommate
    }
}
