using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public class FlatServiceType
    {
        public Guid Id { get; set; }
        public Guid FlatId { get; set; }
        public Flat Flat { get; set; }
        public ServiceType ServiceType { get; set; }
    }
}
