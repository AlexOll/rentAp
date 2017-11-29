using Microsoft.AspNetCore.Http;

namespace RentApp.Models.ResponseModels
{
    public class BaseResponse
    {
        public string Message { get; set; } = "OK";
        public int ResponseCode { get; set; } = StatusCodes.Status200OK;
    }
}