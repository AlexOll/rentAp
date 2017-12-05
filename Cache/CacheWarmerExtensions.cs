using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace RentApp.Cache
{
    public static class CacheWarmerExtensions
    {
        public static void UseCacheWarmer(this IApplicationBuilder app)
        {
            app.ApplicationServices.GetRequiredService<UserCache>();
        }
    }
}
