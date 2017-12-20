using System.Collections.Generic;

namespace RentApp.Models.ResponseModels
{
    public class UserMessagesResponse : BaseResponse
    {
        public List<MessageResponse> Messages { get; }
        public List<AuthenticationResponse> Users { get; }

        public UserMessagesResponse(List<MessageResponse> messages, List<AuthenticationResponse> users)
        {
            Messages = messages;
            Users = users;
        }
    }
}
