using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.RequestModels
{
    public class CreateOfferRequest
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsAlive { get; set; }

        public RealEstateType RealEstateType { get; set; }
        public BaseRealEstateDetailes RealEstateDetailes { get; set; }
        public OfferType OfferType { get; set; }
        public BaseOfferDetailes OfferDetailes { get; set; }

        public string Description { get; set; }
        public double Area { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public List<RealEstatePhoto> Photos { get; set; }

        public double Price { get; set; }

        // Accommodation detailes
        public int Floor { get; set; }
        public bool Balcony { get; set; }
        public bool Terrace { get; set; }

        // Garage detailes
        public string TypeOfGarage { get; set; }

        // Land detailes
        public string Purpose { get; set; }

        // Long-term offer detailes / short-term offer detailes
        public DateTime FreeDate { get; set; }

        // Roommate offer detailes
        public String RommateRules { get; set; }

        // Sale offer detailes
        public string Documents { get; set; }


        public static explicit operator Offer(CreateOfferRequest request)
        {
            var model = new Offer();
            model.Id = request.Id;
            model.RealEstateType = request.RealEstateType;
            model.OfferType = request.OfferType;
            model.Description = request.Description;
            model.Area = request.Area;
            model.Lat = request.Lat;
            model.Lng = request.Lng;
            model.Price = request.Price;

            if (request.RealEstateType == RealEstateType.Garage)
            {
                model.RealEstateDetailes = new GarageDetailes
                {
                    TypeOfGarage = request.TypeOfGarage
                };
            }
            else if (request.RealEstateType == RealEstateType.Land)
            {
                model.RealEstateDetailes = new LandDetailes
                {
                    Purpose = request.Purpose
                };
            }
            else
            {
                model.RealEstateDetailes = new AccommodationDetailes
                {
                    Balcony = request.Balcony,
                    Floor = request.Floor,
                    Terrace = request.Terrace
                };
            }

            if (request.OfferType == OfferType.LongTermRent)
            {
                model.OfferDetailes = new LTRentOfferDetailes
                {
                    FreeDate = request.FreeDate
                };
            }
            else if (request.OfferType == OfferType.ShortTermRent)
            {
                model.OfferDetailes = new STRentOfferDetailes
                {
                    FreeDate = request.FreeDate
                };
            }
            else if (request.OfferType == OfferType.Roommate)
            {
                model.OfferDetailes = new RoommateOfferDetailes
                {
                    RommateRules = request.RommateRules
                };
            }
            else if (request.OfferType == OfferType.Sale)
            {
                model.OfferDetailes = new SaleOfferDetailes
                {
                    Documents = request.Documents
                };
            }

            return model;
        }
    }
}
