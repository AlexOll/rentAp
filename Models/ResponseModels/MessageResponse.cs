using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class MessageResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public Guid UserIdTo { get; set; }
        public Guid UserIdFrom { get; set; }
        public string Body { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreateDateTime { get; set; }

        public MessageResponse(Message model)
        {
            Id = model.Id;
            UserIdTo = model.UserIdTo;
            UserIdFrom = model.UserIdFrom;
            Body = model.Body;
            IsRead = model.IsRead;
            CreateDateTime = model.CreateDateTime;
        }

        public static explicit operator MessageResponse(Message model)
        {
            return new MessageResponse(model);
        }
    }
}
