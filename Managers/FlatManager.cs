using RentApp.Models.DbModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Managers
{
    public class FlatManager
    {
        private FlatRepository _flatRepository;

        public FlatManager(FlatRepository flatRepository)
        {
            _flatRepository = flatRepository;
        }

        internal async Task<IEnumerable<Flat>> GetAll()
        {
            return await Task.Factory.StartNew(() => _flatRepository.GetAll());
        }

        internal async Task<Flat> GetById(Guid id)
        {
            return await Task.Factory.StartNew(() => _flatRepository.GetById(id));
        }

        internal async Task<BaseResponse> Create(Flat item)
        {
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;
            await Task.Factory.StartNew(() => _flatRepository.Create(item));
            return new BaseResponse();
        }

        internal BaseResponse Update(Flat item)
        {
            _flatRepository.Update(item);
            return new BaseResponse();
        }

        internal BaseResponse Remove(Flat item)
        {
            _flatRepository.Remove(item);
            return new BaseResponse();
        }
    }
}
