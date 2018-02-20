using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum RealEstateType
    {
        [Description("Appartment")]
        Appartment = 1,
        [Description("House")]
        House,
        [Description("Land")]
        Land,
        [Description("Garage")]
        Garage,
        [Description("Office")]
        Office,
        [Description("Commercial space")]
        CommercialSpace
    }
}
