using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class UserCache
    {
        private static Dictionary<Guid, UserCacheItem> _aliveUsers;

        public static Dictionary<Guid, UserCacheItem> CachedItems
        {
            get
            {
                return _aliveUsers;
            }
        }

        public UserCache(UserRepository userRepository)
        {
            _aliveUsers = userRepository.GetAllAlive()
                .Select(s => (UserCacheItem)s)
                .ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(User user)
        {
            if (_aliveUsers.ContainsKey(user.Id))
            {
                _aliveUsers[user.Id] = (UserCacheItem)user;
            }
            else
            {
                _aliveUsers.Add(user.Id, (UserCacheItem)user);
            }
        }
    }
}
