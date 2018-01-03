using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RentApp.Repositories;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RentApp.Cache
{
    public static class CacheExtension
    {
        public static void UseCache(this IApplicationBuilder app)
        {
            try
            {
                app.ApplicationServices.GetRequiredService<UserCache>();

                app.ApplicationServices.GetRequiredService<MessageCache>();

                app.ApplicationServices.GetRequiredService<FlatCache>();

                app.ApplicationServices.GetRequiredService<RealEstateCache>();


                Task.Factory.StartNew(() => UpdateDb(app));
            }
            catch
            {

            }
        }

        private static void UpdateDb(IApplicationBuilder app)
        {
            var tenMinutes = 600000;
            while (true)
            {
                Thread.Sleep(tenMinutes);
                using (var serviceScope = app.ApplicationServices.CreateScope())
                {
                    var userRepository = serviceScope.ServiceProvider.GetRequiredService<UserRepository>();
                    var result = UserCache.CachedItems.Values.Select(s => s.CreateDbModel());
                    userRepository.Update(result);
                }
            }
        }
    }
}
