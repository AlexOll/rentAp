using RentApp.Models.DtoModels.Offers;
using RentApp.Models.DtoModels.Property;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.Structs;
using System;

namespace RentApp.Managers
{
    public class OfferFactory
    {
        public IProperty Property { get; set; }
        public IOffer Offer { get; set; }

        public OfferFactory(CreateOfferRequest createOfferRequest)
        {
            switch (createOfferRequest.OfferType)
            {
                case OfferType.Sale:
                    Offer = (SaleOffer)createOfferRequest;
                    break;
                case OfferType.ShortTermRent:
                    Offer = (STRentOffer)createOfferRequest;
                    break;
                case OfferType.LongTermRent:
                    Offer = (LTRentOffer)createOfferRequest;
                    break;
                //case OfferType.Roommate:
                //    Offer = (RoommateOffer)createOfferRequest;
                //    break;
                default:
                    throw new ArgumentException();

            }

            switch (createOfferRequest.PropertyType)
            {
                case PropertyType.Appartment:
                    Property = (AppartmentProperty)createOfferRequest;
                    break;
                case PropertyType.Garage:
                    Property = (GarageProperty)createOfferRequest;
                    break;
                case PropertyType.CommercialSpace:
                    Property = (CommercialProperty)createOfferRequest;
                    break;
                case PropertyType.House:
                    Property = (HouseProperty)createOfferRequest;
                    break;
                case PropertyType.Land:
                    Property = (LandProperty)createOfferRequest;
                    break;
                case PropertyType.Office:
                    Property = (OfficeProperty)createOfferRequest;
                    break;
                case PropertyType.Room:
                    Property = (RoomProperty)createOfferRequest;
                    break;
                default:
                    throw new ArgumentException();

            }

           

        }
    }
}
