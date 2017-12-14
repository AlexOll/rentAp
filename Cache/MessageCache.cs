using RentApp.Models.DbModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Cache
{
    public class MessageCache
    {
        private static Dictionary<Guid, Message> _cachedItems;

        public static Dictionary<Guid, Message> CachedItems
        {
            get
            {
                return _cachedItems;
            }
        }

        public MessageCache(MessageRepository repository)
        {
            _cachedItems = repository.GetAllAlive().ToDictionary(x => x.Id, x => x);
        }

        public static void AddOrUpdate(Message item)
        {
            if (_cachedItems.ContainsKey(item.Id))
            {
                _cachedItems[item.Id] = item;
            }
            else
            {
                _cachedItems.Add(item.Id, item);
            }
        }
    }
}
