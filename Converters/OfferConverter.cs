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
            // if realEstateType exist
            RealEstateType realEstateType = (RealEstateType)jObject.Value<int>("realEstateType");
            // if realEstateType = 0, or Enum.tryParse = false, or check it inside GetRealEstateConverter

            var realEstateConverter = GetRealEstateConverter(realEstateType);
            serializer.Converters.Insert(0, realEstateConverter);

            var obj = new Offer();
            serializer.Populate(jObject.CreateReader(), obj);

            return obj;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }

        private JsonConverter GetRealEstateConverter(RealEstateType realEstateType)
        {
            if (realEstateType == RealEstateType.Appartment
                || realEstateType == RealEstateType.CommercialSpace
                || realEstateType == RealEstateType.House
                || realEstateType == RealEstateType.Office) // remove this condition to else
            {
                return new RealEstateDetailsConverter<AccommodationDetailes>();
            }
            else if (realEstateType == RealEstateType.Garage)
            {
                return new RealEstateDetailsConverter<GarageDetailes>();
            }
            else if (realEstateType == RealEstateType.Land)
            {
                return new RealEstateDetailsConverter<LandDetailes>();
            }
            else
            {
                throw new ArgumentException("Unknown real estate type.");
            }
        }
    }
}
