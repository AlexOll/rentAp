using RentApp.Models.RequestModels;

namespace RentApp.Models.DtoModels.Offers
{
    public class SaleOffer : Offer
    {
        public SaleOffer(CreateOfferRequest request)
                   : base(request.Price)
        {

        }

        public static explicit operator SaleOffer(CreateOfferRequest request)
        {
            return new SaleOffer(request);
        }
    }
}
