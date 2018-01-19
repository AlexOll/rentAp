using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Managers
{
    public class RealEstateOfferManager
    {
        private RealEstateOfferRepository _offerRepository;

        public RealEstateOfferManager(RealEstateOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
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
                     && o.ServiceType == filter.ServiceType
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

            if (filter.PriceTo.HasValue)
            {
                offers = offers.Where(o => o.Price <= filter.PriceTo);
            }

            return offers.Select(o => (OfferFilterResponse)o);
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
