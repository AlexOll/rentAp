using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RentApp.Models;

namespace RentApp.Cache
{
    public static class CacheWarmerExtensions
    {
        public static void UseCacheWarmer(this IApplicationBuilder app)
        {
            try
            {
                app.ApplicationServices.GetRequiredService<UserCache>();
                //app.ApplicationServices.GetRequiredService<FlatCache>();
            }
            catch
            {

            }
        }
    }
}
