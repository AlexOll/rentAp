﻿using Microsoft.AspNetCore.SignalR;
using RentApp.Cache;
using RentApp.Hubs;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Managers
{
    public class ProfileManager
    {
        MessageRepository _messageRepository;
        IHubContext<MainHub> _hubContext;

        public ProfileManager(MessageRepository messageRepository, IHubContext<MainHub> hubContext)
        {
            _messageRepository = messageRepository;
            _hubContext = hubContext;
        }

        internal UserMessagesResponse GetAllUserMessages(Guid userId)
        {
            var messageList = MessageCache.CachedItems.Values
                .Where(w => w.UserIdFrom == userId || w.UserIdTo == userId)
                .OrderBy(o => o.CreateDateTime)
                .Select(x => (MessageResponse)x)
                .ToList();


            var distinctUserIds = messageList
                .Select(s => new[] { s.UserIdFrom, s.UserIdTo })
                .SelectMany(s => s)
                .Where(w => w != userId)
                .Distinct();

            var userList = new List<AuthenticationResponse>();
            foreach (var item in distinctUserIds)
                if (UserCache.CachedItems.ContainsKey(item))
                    userList.Add((AuthenticationResponse)UserCache.CachedItems[item]);

            return new UserMessagesResponse(messageList, userList);
        }

        internal async Task<BaseResponse> SendMessage(SendMessageRequest messageRequest)
        {
            var message = messageRequest.CreateDbModel();
            _messageRepository.Create(message);

            UserCache.CachedItems.TryGetValue(message.UserIdTo, out UserCacheItem result);

           await _hubContext.Clients.Client(result?.ConnectionId.ToString())
                .InvokeAsync("messageSent", new MessageResponse(message));

            return new BaseResponse();
        }
    }
}
