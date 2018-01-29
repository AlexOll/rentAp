﻿using Autofac;
using RentApp.Cache;
using RentApp.Managers;
using RentApp.Models.DtoModels.Offers;
using RentApp.Models.DtoModels.Property;
using RentApp.Models.Interfaces;
using RentApp.Models.Structs;
using RentApp.Repositories;
using System;

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

            //builder.RegisterType<FlatCache>().AsSelf();
            //builder.RegisterType<FlatManager>().AsSelf();
            //builder.RegisterType<FlatRepository>().AsSelf();

            //builder.RegisterType<FlatFilterManager>().AsSelf();

            builder.RegisterType<MessageCache>().AsSelf();
            builder.RegisterType<ProfileManager>().AsSelf();
            builder.RegisterType<MessageRepository>().AsSelf();

            builder.RegisterType<RealEstateCache>().AsSelf();
            builder.RegisterType<RealEstateManager>().AsSelf();
            builder.RegisterType<RealEstateRepository>().AsSelf();

            builder.RegisterType<RealEstateOfferCache>().AsSelf();
            builder.RegisterType<OfferManager>().AsSelf();
            builder.RegisterType<OfferRepository>().AsSelf();

   
        }
    }
}
