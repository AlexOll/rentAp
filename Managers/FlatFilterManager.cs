using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Managers
{
    public class FlatFilterManager
    {
        private readonly FlatRepository _flatRepository;

        public FlatFilterManager(FlatRepository flatRepository)
        {
            _flatRepository = flatRepository;
        }

        public async Task<IEnumerable<Flat>> GetByFilter(FlatFilterRequest filter)
        {
            return await Task.Factory.StartNew(() => _flatRepository.GetAll());
        }
    }
}
