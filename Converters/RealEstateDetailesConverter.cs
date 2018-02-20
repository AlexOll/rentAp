using Newtonsoft.Json.Converters;
using RentApp.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Converters
{
    public class RealEstateDetailsConverter<T> : CustomCreationConverter<IRealEstateDetails> where T : IRealEstateDetails, new()
    {
        public override IRealEstateDetails Create(Type objectType)
        {
            return new T();
        }
    }
}
