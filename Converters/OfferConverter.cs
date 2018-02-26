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
        private readonly Dictionary<RealEstateType, JsonConverter> _realEstateDetailesMap =
            new Dictionary<RealEstateType, JsonConverter>
                {
                    {RealEstateType.Appartment,      new RealEstateDetailesConverter<AccommodationDetailes>()},
                    {RealEstateType.CommercialSpace, new RealEstateDetailesConverter<AccommodationDetailes>()},
                    {RealEstateType.House,           new RealEstateDetailesConverter<AccommodationDetailes>()},
                    {RealEstateType.Office,          new RealEstateDetailesConverter<AccommodationDetailes>()},
                    {RealEstateType.Garage,          new RealEstateDetailesConverter<GarageDetailes>()},
                    {RealEstateType.Land,            new RealEstateDetailesConverter<LandDetailes>()}
                };

        private readonly Dictionary<OfferType, JsonConverter> _offerDetailesMap =
            new Dictionary<OfferType, JsonConverter>
                {
                    {OfferType.Sale,          new OfferDetailesConverter<SaleOfferDetailes>()},
                    {OfferType.LongTermRent,  new OfferDetailesConverter<LTRentOfferDetailes>()},
                    {OfferType.ShortTermRent, new OfferDetailesConverter<STRentOfferDetailes>()},
                    {OfferType.Roommate,      new OfferDetailesConverter<RoommateOfferDetailes>()}
                };

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

            RealEstateType realEstateType = (RealEstateType)jObject.Value<int>("realEstateType");

            var realEstateDetailesConverter = GetRealEstateDetailesConverter(realEstateType);
            serializer.Converters.Insert(0, realEstateDetailesConverter);

            OfferType offerType = (OfferType)jObject.Value<int>("offerType");

            var offerDetailesConverter = GetOfferDetailesConverter(offerType);
            serializer.Converters.Insert(1, offerDetailesConverter);

            var obj = new Offer();
            serializer.Populate(jObject.CreateReader(), obj);

            return obj;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }

        private JsonConverter GetRealEstateDetailesConverter(RealEstateType realEstateType)
        {
            if (!_realEstateDetailesMap.ContainsKey(realEstateType))
            {
                throw new ArgumentException(String.Format("Unknown real estate type: {0}.", realEstateType));
            }

            return _realEstateDetailesMap[realEstateType];
        }

        private JsonConverter GetOfferDetailesConverter(OfferType offerType)
        {
            if (!_offerDetailesMap.ContainsKey(offerType))
            {
                throw new ArgumentException(String.Format("Unknown offer type {0}.", offerType));
            }

            return _offerDetailesMap[offerType];
        }
    }
}
