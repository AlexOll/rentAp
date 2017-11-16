using RentApp.Models.DbModels;
using RentApp.Repositories;
using System.Collections.Generic;

namespace RentApp.Cache
{
    public class UserCache
    {
        private static List<User> _aliveUsers;
        private static object locker = new object();

        public static List<User> AliveUsers
        {
            get
            {
                if (_aliveUsers == null)
                {
                    lock(locker)
                    {
                        _aliveUsers = _userRepository.GetAllAlive();
                    }
                }
                return _aliveUsers;
            }
        }
        private static UserRepository _userRepository;
        public UserCache(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public static void Update(User user)
        {
            int index = _aliveUsers.FindIndex(a => a.Id == user.Id);
            _aliveUsers[index] = user;
        }
    }
}
