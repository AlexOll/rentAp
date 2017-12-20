using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.RequestModels
{
    public class SendMessageRequest
    {
        public Guid Id { get; set; }
        public Guid UserIdTo { get; set; }
        public Guid UserIdFrom { get; set; }
        public string Body { get; set; }
        public DateTime CreateDateTime { get; set; }

        public Message CreateDbModel()
        {
            var model = new Message();
            model.Id = Id;
            model.UserIdTo = UserIdTo;
            model.UserIdFrom = UserIdFrom;
            model.Body = Body;
            model.CreateDateTime = CreateDateTime;
            model.IsAlive = true;
            model.IsRead = false;

            return model;
        }
    }
}
