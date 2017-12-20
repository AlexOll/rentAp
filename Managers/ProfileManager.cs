using RentApp.Cache;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using RentApp.Models.ResponseModels;
using RentApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Managers
{
    public class ProfileManager
    {
        MessageRepository _messageRepository;

        public ProfileManager(MessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        internal (List<AuthenticationResponse>, List<MessageResponse>)
            GetAllUserMessages(Guid userId)
        {
            var messageList = MessageCache.CachedItems.Values
                .Where(w => w.UserIdFrom == userId || w.UserIdTo == userId)
                .OrderBy(o => o.CreateDate)
                .Cast<MessageResponse>()
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

            return (userList, messageList);
        }

        internal BaseResponse SendMessage(SendMessageRequest messageRequest)
        {
            var message = messageRequest.CreateDbModel();
            _messageRepository.Create(message);

            return new BaseResponse();
        }
    }
}
