﻿using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class RealEstateOffer
    {
        [Key]
        public Guid Id { get; set; }
        public ServiceType ServiceType { get; set; }
        public RealEstateObject RealEstateObject { get; set; }
        public int Price { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsAlive { get; set; }
    }
}