using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.RequestModels
{
    public class OfferFilterRequest
    {
        public ServiceType ServiceType { get; set; }
        public List<PropertyType> PropertyTypeList { get; set; } = new List<PropertyType>();
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTo { get; set; }
    }
}
