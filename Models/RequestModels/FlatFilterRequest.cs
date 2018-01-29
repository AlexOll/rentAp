using System.Collections.Generic;

namespace RentApp.Models.RequestModels
{
    public class FlatFilterRequest
    {
        public int OfferType { get; set; }
        public List<int> PropertyTypeList { get; set; } = new List<int>();
        public string PlaceId { get; set; }
    }
}
