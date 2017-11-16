using Autofac;
using RentApp.Cache;
using RentApp.Managers;
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
        }
    }
}
