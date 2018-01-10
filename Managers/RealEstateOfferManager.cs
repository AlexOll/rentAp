using RentApp.Models.DbModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;

namespace RentApp.Managers
{
    public class RealEstateOfferManager
    {
        private RealEstateOfferRepository _offerRepository;

        public RealEstateOfferManager(RealEstateOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        internal IEnumerable<RealEstateOffer> GetAll()
        {
            return _offerRepository.GetAll();
        }

        internal RealEstateOffer GetById(Guid id)
        {
            return _offerRepository.GetById(id);
        }

        internal BaseResponse Create(RealEstateOffer item)
        {
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;

            _offerRepository.Create(item);

            return new BaseResponse();
        }

        internal BaseResponse Update(RealEstateOffer item)
        {
            _offerRepository.Update(item);
            return new BaseResponse();
        }

        internal BaseResponse Remove(Guid id)
        {
            _offerRepository.Remove(id);
            return new BaseResponse();
        }
    }
}
