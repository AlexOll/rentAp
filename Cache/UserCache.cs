using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class UserCache
    {
        private static Dictionary<Guid, User> _aliveUsers;

        public static Dictionary<Guid, User> CachedItems
        {
            get
            {
                return _aliveUsers;
            }
        }

        public UserCache(UserRepository userRepository)
        {
            _aliveUsers = userRepository.GetAllAlive().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(User user)
        {
            if (_aliveUsers.ContainsKey(user.Id))
            {
                _aliveUsers[user.Id] = user;
            }
            else
            {
                _aliveUsers.Add(user.Id, user);
            }
        }
    }
}
