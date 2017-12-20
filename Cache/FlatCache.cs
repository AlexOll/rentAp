using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class FlatCache
    {
        private static Dictionary<Guid, Flat> _aliveFlats;

        public static Dictionary<Guid, Flat> CachedItems
        {
            get
            {
                return _aliveFlats;
            }
        }

        public FlatCache(FlatRepository flatRepository)
        {
            _aliveFlats = flatRepository.GetAll().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(Flat flat)
        {
            if (_aliveFlats.ContainsKey(flat.Id))
            {
                _aliveFlats[flat.Id] = flat;
            }
            else
            {
                _aliveFlats.Add(flat.Id, flat);
            }
        }
    }
}
