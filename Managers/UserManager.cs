using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;

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
            item.CreateDate = DateTime.Now;
            await Task.Factory.StartNew(() => _userRepository.Create(item));
            return item.Id;
        }

        internal async Task<AuthenticationResponse> Authentificate(AuthenticationRequest inputUser)
        {
            var foundUser = await Task.Factory.StartNew(() => _userRepository.GetByLogin(inputUser.Login));
            if(foundUser!=null && foundUser.Password == inputUser.Password)
            {
                return (AuthenticationResponse)foundUser;
            }
            return null;
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
