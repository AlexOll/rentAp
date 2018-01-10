using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class RealEstateOfferCache
    {
        private static Dictionary<Guid, RealEstateOffer> _aliveOffers;

        public static Dictionary<Guid, RealEstateOffer> CachedItems
        {
            get
            {
                return _aliveOffers;
            }
        }

        public RealEstateOfferCache(RealEstateOfferRepository offerRepository)
        {
            _aliveOffers = offerRepository.GetAll().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(RealEstateOffer realEstateOffer)
        {
            if (_aliveOffers.ContainsKey(realEstateOffer.Id))
            {
                _aliveOffers[realEstateOffer.Id] = realEstateOffer;
            }
            else
            {
                _aliveOffers.Add(realEstateOffer.Id, realEstateOffer);
            }
        }
    }
}
