using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum PropertyType
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
        [Description("CommercialSpace")]
        CommercialSpace,
        [Description("Other")]
        Other
    }
}
