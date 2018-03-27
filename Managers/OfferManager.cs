using Microsoft.AspNetCore.Http;
using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
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

        internal IEnumerable<Offer> GetAll()
        {
            return _offerRepository.GetAll();
        }

        internal Offer GetById(Guid id)
        {
            return _offerRepository.GetById(id);
        }

        internal IEnumerable<OfferFilterResponse> GetByFilter(OfferFilterRequest filter)
        {
            //double coordDelta = 0.3;

            //var offers = OfferCache.CachedItems.Values
            //    .Where(o => o.IsAlive
            //         && o.Type == filter.ServiceType
            //         && Math.Abs(o.RealEstateObject.Lat - filter.Lat) <= coordDelta
            //         && Math.Abs(o.RealEstateObject.Lng - filter.Lng) <= coordDelta);

            //if (filter.PropertyTypeList.Any())
            //{
            //    offers = offers.Where(o => filter.PropertyTypeList.Contains(o.RealEstateObject.PropertyType));
            //}

            //if (filter.PriceFrom.HasValue)
            //{
            //    offers = offers.Where(o => o.Price >= filter.PriceFrom);
            //}

            //if (filter.PriceTill.HasValue)
            //{
            //    offers = offers.Where(o => o.Price <= filter.PriceTill);
            //}

            //return offers.Select(o => (OfferFilterResponse)o);

            return new List<OfferFilterResponse>();
        }

        internal BaseResponse Create(Offer item)
        {
            // for doublecheck
            item.Id = new Guid();
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;
            item.IsAlive = true;

            _offerRepository.Create(item);

            return new BaseResponse();
        }

        internal BaseResponse Update(Offer item)
        {
            if (OfferCache.CachedItems.ContainsKey(item.Id))
            {
                // to attach sub-objects to correct entities in database
                Offer cachedItem = OfferCache.CachedItems[item.Id];
                item.OfferDetailes.Id = cachedItem.OfferDetailes.Id;
                item.RealEstateDetailes.Id = cachedItem.RealEstateDetailes.Id;

                _offerRepository.Update(item);
                return new BaseResponse();
            }
            else
            {
                return new BaseResponse
                {
                    Message = "Offer not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }

        internal BaseResponse SoftRemove(Guid id)
        {
            if (OfferCache.CachedItems.ContainsKey(id))
            {
                Offer item = OfferCache.CachedItems[id];
                _offerRepository.SoftRemove(item);
                return new BaseResponse();
            }
            else
            {
                return new BaseResponse
                {
                    Message = "Offer not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }

        internal BaseResponse AddPhoto(OfferPhoto photo)
        {
            if (OfferCache.CachedItems.ContainsKey(photo.OfferId))
            {
                Offer offer = OfferCache.CachedItems[photo.OfferId];
                offer.Photos.Add(photo);
                _offerRepository.Update(offer);
                return new BaseResponse();
            }
            else
            {
                return new BaseResponse
                {
                    Message = "Offer not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }

        internal BaseResponse RemovePhoto(OfferPhoto photo)
        {
            if (OfferCache.CachedItems.ContainsKey(photo.OfferId))
            {
                Offer offer = OfferCache.CachedItems[photo.OfferId];
                OfferPhoto photoToRemove = offer.Photos.Single(p => p.Id == photo.Id);
                if (photoToRemove != null)
                {
                    offer.Photos.Remove(photoToRemove);
                    _offerRepository.RemovePhoto(photoToRemove);
                    return new BaseResponse();
                }
                else
                {
                    return new BaseResponse
                    {
                        Message = "Photo not exists",
                        ResponseCode = StatusCodes.Status406NotAcceptable
                    };
                }
            }
            else
            {
                return new BaseResponse
                {
                    Message = "Offer not exists",
                    ResponseCode = StatusCodes.Status406NotAcceptable
                };
            }
        }
    }
}
