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
            UserCache.CachedItems[id].ConnectionId = Context.ConnectionId;
        }

        public override Task OnDisconnectedAsync(Exception ex)
        {
            var userId = UserCache.CachedItems.Values
                .FirstOrDefault(f => f.ConnectionId == Context.ConnectionId)
                .Id;
            UserCache.CachedItems[userId].ConnectionId = null;

            return base.OnDisconnectedAsync(ex);
        }
    }
}
