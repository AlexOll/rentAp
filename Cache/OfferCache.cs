using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
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

        public static void AddOrUpdate(Offer offer)
        {
            if (_aliveOffers.ContainsKey(offer.Id))
            {
                _aliveOffers[offer.Id] = offer;
            }
            else
            {
                _aliveOffers.Add(offer.Id, offer);
            }
        }
    }
}
