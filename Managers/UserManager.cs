using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RentApp.Models;
using System.Net;

namespace RentApp.Managers
{
    public class UserManager
    {
        private UserRepository _userRepository;

        public UserManager(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        internal async Task<IEnumerable<User>> GetAll()
        {
            return await Task.Factory.StartNew(() => _userRepository.GetAll());
        }

        internal async Task<User> GetById(Guid id)
        {
            return await Task.Factory.StartNew(() => _userRepository.GetById(id));
        }

        internal async Task<Guid> Create(User item)
        {
            item.Id = Guid.NewGuid();
            await Task.Factory.StartNew(() => _userRepository.Create(item));
            return item.Id;
        }

        internal async Task Update(User item)
        {
            await Task.Factory.StartNew(() => _userRepository.Update(item));
        }

        internal async Task Delete(Guid id)
        {
            var user = await GetById(id);
            user.IsAlive = false;
            await Task.Factory.StartNew(() => _userRepository.Update(user));
        }
    }
}
