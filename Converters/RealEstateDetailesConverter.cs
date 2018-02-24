﻿using Newtonsoft.Json.Converters;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Converters
{
    public class RealEstateDetailesConverter<T> : CustomCreationConverter<BaseRealEstateDetailes> where T : BaseRealEstateDetailes, new()
    {
        public override BaseRealEstateDetailes Create(Type objectType)
        {
            return new T();
        }
    }
}