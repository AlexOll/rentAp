using Autofac;
using RentApp.Managers;
using RentApp.Repositories;

namespace RentApp.RunModules
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserManager>().AsSelf();
            builder.RegisterType<UserRepository>().AsSelf();

            builder.RegisterType<FlatManager>().AsSelf();
            builder.RegisterType<FlatRepository>().AsSelf();
        }
    }
}
