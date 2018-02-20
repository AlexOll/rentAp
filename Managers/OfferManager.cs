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
    public class OfferManager
    {
        private OfferRepository _offerRepository;

        public OfferManager(OfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        internal IEnumerable<Offer> GetAll()
        {
            return _offerRepository.GetAll();
        }

        internal Offer GetById(Guid id)
        {
            return _offerRepository.GetById(id);
        }

        internal IEnumerable<OfferFilterResponse> GetByFilter(OfferFilterRequest filter)
        {
            //double coordDelta = 0.3;

            //var offers = OfferCache.CachedItems.Values
            //    .Where(o => o.IsAlive
            //         && o.Type == filter.ServiceType
            //         && Math.Abs(o.RealEstateObject.Lat - filter.Lat) <= coordDelta
            //         && Math.Abs(o.RealEstateObject.Lng - filter.Lng) <= coordDelta);

            //if (filter.PropertyTypeList.Any())
            //{
            //    offers = offers.Where(o => filter.PropertyTypeList.Contains(o.RealEstateObject.PropertyType));
            //}

            //if (filter.PriceFrom.HasValue)
            //{
            //    offers = offers.Where(o => o.Price >= filter.PriceFrom);
            //}

            //if (filter.PriceTill.HasValue)
            //{
            //    offers = offers.Where(o => o.Price <= filter.PriceTill);
            //}

            //return offers.Select(o => (OfferFilterResponse)o);

            return new List<OfferFilterResponse>();
        }

        internal BaseResponse Create(Offer item)
        {
            //item.CreateDate = DateTime.Now;
            //item.UpdateDate = DateTime.Now;

            //_offerRepository.Create(item);

            return new BaseResponse();
        }

        internal BaseResponse Update(Offer item)
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
