
using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum ServiceType
    {
        [Description("Offer sale")]
        OfferSale = 1,
        [Description("Long-time rental offer")]
        LTOfferRental,
        [Description("Short-time rental offer")]
        STOfferRental,
        [Description("Offer rommate")]
        OfferRoommate,
        //[Description("Sales demand")]
        //DemandSale
        //[Description("Demand rental")]
        //DemandRental,
        //[Description("Demand for roommates")]
        //DemandRoommate
    }
}
