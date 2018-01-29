using Autofac.Features.Indexed;
using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Managers
{
    public class OfferManager
    {
        private OfferRepository _offerRepository;
        private readonly IIndex<OfferType, IOffer> _offerList;
        private readonly IIndex<PropertyType, IProperty> _propertyList;

        public OfferManager(OfferRepository offerRepository,
            IIndex<OfferType, IOffer> offerList,
            IIndex<PropertyType, IProperty> propertyList)
        {
            _offerRepository = offerRepository;
            _offerList = offerList;
            _propertyList = propertyList;
        }

        internal IEnumerable<RealEstateOffer> GetAll()
        {
            return _offerRepository.GetAll();
        }

        internal RealEstateOffer GetById(Guid id)
        {
            return _offerRepository.GetById(id);
        }

        internal IEnumerable<OfferFilterResponse> GetByFilter(OfferFilterRequest filter)
        {
            double coordDelta = 0.3;
            
            var offers = RealEstateOfferCache.CachedItems.Values
                .Where(o => o.IsAlive
                     && o.OfferType == filter.OfferType
                     && Math.Abs(o.RealEstateObject.Lat - filter.Lat) <= coordDelta
                     && Math.Abs(o.RealEstateObject.Lng - filter.Lng) <= coordDelta);

            if (filter.PropertyTypeList.Any())
            {
                offers = offers.Where(o => filter.PropertyTypeList.Contains(o.RealEstateObject.PropertyType));
            }

            if (filter.PriceFrom.HasValue)
            {
                offers = offers.Where(o => o.Price >= filter.PriceFrom);
            }

            if (filter.PriceTill.HasValue)
            {
                offers = offers.Where(o => o.Price <= filter.PriceTill);
            }

            return offers.Select(o => (OfferFilterResponse)o);
        }

        internal BaseResponse Create(CreateOfferRequest item)
        {
            var offerFactory = new OfferFactory(item);

            var offer = offerFactory.Offer;
            var property = offerFactory.Property;

            _offerRepository.Create(offer);

            return new BaseResponse();
        }






        internal BaseResponse Create(RealEstateOffer item)
        {

            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;

            _offerRepository.Create(item);

            return new BaseResponse();
        }

        internal BaseResponse Update(RealEstateOffer item)
        {
            _offerRepository.Update(item);
            return new BaseResponse();
        }

        internal BaseResponse Remove(Guid id)
        {
            _offerRepository.Remove(id);
            return new BaseResponse();
        }
    }
}
