using Microsoft.AspNetCore.SignalR;
using RentApp.Cache;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Hubs
{
    public class MainHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public void InitConnection(Guid id)
        {
            if (UserCache.CachedItems.ContainsKey(id))
                UserCache.CachedItems[id].ConnectionId = Context.ConnectionId;
        }

        public override Task OnDisconnectedAsync(Exception ex)
        {
            var user = UserCache.CachedItems.Values
                .FirstOrDefault(f => f.ConnectionId == Context.ConnectionId);
            if (user != null)
                UserCache.CachedItems[user.Id].ConnectionId = null;

            return base.OnDisconnectedAsync(ex);
        }
    }
}
