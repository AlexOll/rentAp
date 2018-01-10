using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Cache
{
    public class RealEstateOfferCache
    {
        private static Dictionary<Guid, RealEstateOffer> _aliveRealEstateOffers;

        public static Dictionary<Guid, RealEstateOffer> CachedItems
        {
            get
            {
                return _aliveRealEstateOffers;
            }
        }

        public RealEstateOfferCache(RealEstateOfferRepository realEstateOfferRepository)
        {
            _aliveRealEstateOffers = realEstateOfferRepository.GetAll().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(RealEstateOffer realEstateOffer)
        {
            if (_aliveRealEstateOffers.ContainsKey(realEstateOffer.Id))
            {
                _aliveRealEstateOffers[realEstateOffer.Id] = realEstateOffer;
            }
            else
            {
                _aliveRealEstateOffers.Add(realEstateOffer.Id, realEstateOffer);
            }
        }
    }
}
