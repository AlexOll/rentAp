using Microsoft.AspNetCore.Mvc;

namespace RentApp.Models.ResponseModels
{
    public class BaseResponse
    {
        public BaseResponse(string message = null)
        {
            Message = message;
        }
        public string Message { get; }
    }
}