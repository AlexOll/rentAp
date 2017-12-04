using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.RequestModels
{
    public class FlatFilterRequest
    {
        public int ServiceType { get; set; }
        public List<int> PropertyTypeList { get; set; } = new List<int>();
        public string PlaceId { get; set; }
    }
}
