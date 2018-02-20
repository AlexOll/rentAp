using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class OfferCache
    {
        private static Dictionary<Guid, Offer> _aliveOffers;

        public static Dictionary<Guid, Offer> CachedItems
        {
            get
            {
                return _aliveOffers;
            }
        }

        public OfferCache(OfferRepository offerRepository)
        {
            _aliveOffers = offerRepository.GetAll().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(Offer realEstateOffer)
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
