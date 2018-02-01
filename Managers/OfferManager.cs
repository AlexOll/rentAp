using Autofac.Features.Indexed;
using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using RentApp.Repositories;
using RentApp.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Managers
{
    public class OfferManager
    {
        private OfferRepository _offerRepository;

        public OfferManager(OfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        //internal IEnumerable<RealEstateOffer> GetAll()
        //{
        //    return _offerRepository.GetAll();
        //}

        //internal RealEstateOffer GetById(Guid id)
        //{
        //    return _offerRepository.GetById(id);
        //}

        internal IEnumerable<OfferFilterResponse> GetByFilter(OfferFilterRequest filter)
        {
            double coordDelta = 0.3;

            var offers = OfferCache.CachedItems.Values
                .Where(o => o.OfferType == filter.OfferType
                     && Math.Abs(o.Lat - filter.Lat) <= coordDelta
                     && Math.Abs(o.Lng - filter.Lng) <= coordDelta);

            if (filter.PropertyTypeList.Any())
            {
                offers = offers.Where(o => filter.PropertyTypeList.Contains(o.PropertyType));
            }

            if (filter.PriceFrom.HasValue)
            {
                offers = offers.Where(o => o.Price >= filter.PriceFrom);
            }

            if (filter.PriceTill.HasValue)
            {
                offers = offers.Where(o => o.Price <= filter.PriceTill);
            }

            return offers.Select(o => (OfferFilterResponse)o);
        }

        internal List<string> CheckImageExist(List<string> imgSource)
        {
            var cachedImgList =  OfferCache.CachedItems.Values
                .SelectMany(s => s.PropertyPhotos.Select(s1 => s1.Base64))
                .ToList();

            var existingImages = ImageUtility.ReturnDublicateImages(cachedImgList, imgSource);
            return existingImages;
        }

        internal List<IOffer> GetByUserId(Guid id)
        {
            return OfferCache.CachedItems.Values.Where(s => s.UserId == id).ToList();
        }

        internal BaseResponse Create(CreateOfferRequest item)
        {
            var offer = (Offer)item;
            offer.IsAlive = true;
            _offerRepository.Create(offer);

            return new BaseResponse();
        }

        //internal BaseResponse Create(RealEstateOffer item)
        //{

        //    item.CreateDate = DateTime.Now;
        //    item.UpdateDate = DateTime.Now;

        //    _offerRepository.Create(item);

        //    return new BaseResponse();
        //}

        //internal BaseResponse Update(RealEstateOffer item)
        //{
        //    _offerRepository.Update(item);
        //    return new BaseResponse();
        //}

        //internal BaseResponse Remove(Guid id)
        //{
        //    _offerRepository.Remove(id);
        //    return new BaseResponse();
        //}
    }
}
