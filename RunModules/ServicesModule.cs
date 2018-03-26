using Autofac;
using RentApp.Cache;
using RentApp.Managers;
using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using RentApp.Repositories;

namespace RentApp.RunModules
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserCache>().AsSelf();
            builder.RegisterType<UserManager>().AsSelf();
            builder.RegisterType<UserRepository>().AsSelf();

            builder.RegisterType<AuthenticationManager>().AsSelf();

            builder.RegisterType<MessageCache>().AsSelf();
            builder.RegisterType<ProfileManager>().AsSelf();
            builder.RegisterType<MessageRepository>().AsSelf();

            builder.RegisterType<OfferCache>().AsSelf();
            builder.RegisterType<OfferManager>().AsSelf();
            builder.RegisterType<OfferRepository>().AsSelf();

            builder.RegisterType<AccommodationDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.Appartment);
            builder.RegisterType<AccommodationDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.CommercialSpace);
            builder.RegisterType<AccommodationDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.House);
            builder.RegisterType<AccommodationDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.Office);
            builder.RegisterType<GarageDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.Garage);
            builder.RegisterType<LandDetailes>().Keyed<BaseRealEstateDetailes>(RealEstateType.Office);

            builder.RegisterType<SaleOfferDetailes>().Keyed<BaseOfferDetailes>(OfferType.Sale);
            builder.RegisterType<LTRentOfferDetailes>().Keyed<BaseOfferDetailes>(OfferType.LongTermRent);
            builder.RegisterType<STRentOfferDetailes>().Keyed<BaseOfferDetailes>(OfferType.ShortTermRent);
            builder.RegisterType<RoommateOfferDetailes>().Keyed<BaseOfferDetailes>(OfferType.Roommate);
        }
    }
}
