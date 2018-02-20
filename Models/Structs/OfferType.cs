
using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum OfferType
    {
        [Description("Offer sale")]
        Sale = 1,
        [Description("Long-time rental offer")]
        LongTermRent,
        [Description("Short-time rental offer")]
        ShortTermRent,
        [Description("Offer rommate")]
        Roommate,
        //[Description("Sales demand")]
        //DemandSale
        //[Description("Demand rental")]
        //DemandRental,
        //[Description("Demand for roommates")]
        //DemandRoommate
    }
}
