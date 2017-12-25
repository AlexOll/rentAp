using Microsoft.AspNetCore.SignalR;
using RentApp.Cache;
using System;
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
    }
}
