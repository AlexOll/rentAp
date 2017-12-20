using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using RentApp.Repositories;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Cache;
using System.Collections.Generic;

namespace RentApp.Managers
{
    public class FlatManager
    {
        private FlatRepository _flatRepository;

        public FlatManager(FlatRepository flatRepository)
        {
            _flatRepository = flatRepository;
        }

        internal IEnumerable<Flat> GetAll()
        {
            return _flatRepository.GetAll();
        }

        internal Flat GetById(Guid id)
        {
            return _flatRepository.GetById(id);
        }

        internal BaseResponse Create(Flat item)
        {
            item.Id = Guid.NewGuid();
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;
            
            _flatRepository.Create(item);

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
