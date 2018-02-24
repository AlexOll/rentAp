using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public class AccommodationDetailes : BaseRealEstateDetailes
    {
        // placeholder fields
        //public TypesOfBuilding TypeOfBuilding { get; set; }
        //public Equipment Equipment { get; set; }
        public int Floor { get; set; }
        public bool Balcony { get; set; }
        public bool Terrace { get; set; }
    }
}
