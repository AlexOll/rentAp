using System;
using RentApp.Repositories;
using RentApp.Models.DbModels;
using RentApp.Models.ResponseModels;
using System.Collections.Generic;

namespace RentApp.Managers
{
    public class RealEstateManager
    {
        private RealEstateRepository _realEstateRepository;

        public RealEstateManager(RealEstateRepository flatRepository)
        {
            _realEstateRepository = flatRepository;
        }

        internal IEnumerable<RealEstateObject> GetAll()
        {
            return _realEstateRepository.GetAll();
        }

        internal RealEstateObject GetById(Guid id)
        {
            return _realEstateRepository.GetById(id);
        }

        internal BaseResponse Create(RealEstateObject item)
        {
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;

            _realEstateRepository.Create(item);

            return new BaseResponse();
        }

        internal BaseResponse Update(RealEstateObject item)
        {
            _realEstateRepository.Update(item);
            return new BaseResponse();
        }

        internal BaseResponse Remove(Guid id)
        {
            _realEstateRepository.Remove(id);
            return new BaseResponse();
        }
    }
}
