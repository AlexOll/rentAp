using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class RealEstateCache
    {
        private static Dictionary<Guid, RealEstateObject> _aliveRealEstates;

        public static Dictionary<Guid, RealEstateObject> CachedItems
        {
            get
            {
                return _aliveRealEstates;
            }
        }

        public RealEstateCache(RealEstateRepository realEstateRepository)
        {
            _aliveRealEstates = realEstateRepository.GetAll().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(RealEstateObject realEstate)
        {
            if (_aliveRealEstates.ContainsKey(realEstate.Id))
            {
                _aliveRealEstates[realEstate.Id] = realEstate;
            }
            else
            {
                _aliveRealEstates.Add(realEstate.Id, realEstate);
            }
        }
    }
}
