using RentApp.Models.DbModels;

namespace RentApp.Models.RequestModels
{
    public class AuthenticationRequest
    {
        public string Input { get; set; }
        public string Password { get; set; }
    }
}
