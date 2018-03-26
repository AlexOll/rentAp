using Autofac;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Converters
{
    public class OfferConverter : JsonConverter
    {
        public override bool CanWrite { get; } = false;
        public override bool CanRead { get; } = true;

        public override bool CanConvert(Type objectType)
        {
            return typeof(Offer).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
            {
                return null;
            }

            JObject jObject = JObject.Load(reader);

            OfferType offerType = (OfferType)jObject.Value<int>("offerType");
            RealEstateType realEstateType = (RealEstateType)jObject.Value<int>("realEstateType");

            Offer obj = Create(offerType, realEstateType);

            serializer.Populate(jObject.CreateReader(), obj);

            return obj;
        }

        public Offer Create(OfferType offerType, RealEstateType realEstateType)
        {
            Offer offer = new Offer
            {
                OfferDetailes = Startup.Container.ResolveKeyed<BaseOfferDetailes>(offerType),
                RealEstateDetailes = Startup.Container.ResolveKeyed<BaseRealEstateDetailes>(realEstateType)
            };

            return offer;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }
    }
}
