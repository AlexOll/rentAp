using Newtonsoft.Json.Converters;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Converters
{
    public class OfferDetailesConverter<T> : CustomCreationConverter<BaseOfferDetailes> where T: BaseOfferDetailes, new()
    {
        public override BaseOfferDetailes Create(Type objectType)
        {
            return new T();
        }
    }
}
