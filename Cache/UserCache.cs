using RentApp.Models.Cache;
using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class UserCache
    {
        private static Dictionary<Guid, UserCacheItem> _cachedItems;

        public static Dictionary<Guid, UserCacheItem> CachedItems
        {
            get
            {
                return _cachedItems;
            }
        }

        public UserCache(UserRepository userRepository)
        {
            _cachedItems = userRepository.GetAllAlive()
                .Select(s => (UserCacheItem)s)
                .ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(User user)
        {
            if (_cachedItems.ContainsKey(user.Id))
            {
                _cachedItems[user.Id] = (UserCacheItem)user;
            }
            else
            {
                _cachedItems.Add(user.Id, (UserCacheItem)user);
            }
        }
    }
}
