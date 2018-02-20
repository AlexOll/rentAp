﻿using RentApp.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public class GarageDetailes : IRealEstateDetails
    {
        // placeholder fields
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TypeOfGarage { get; set; }
    }
}
