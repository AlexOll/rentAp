using RentApp.Models.DbModels;

namespace RentApp.Models.RequestModels
{
    public class AuthenticationRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
