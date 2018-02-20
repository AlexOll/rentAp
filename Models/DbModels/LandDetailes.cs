using RentApp.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public class LandDetailes : IRealEstateDetails
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Purpose { get; set; }
    }
}
