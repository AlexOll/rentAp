using Microsoft.AspNetCore.Mvc;
using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using RentApp.Utilities;
using System.Collections.Generic;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class DictionaryController : ApiController
    {
        [HttpGet, Route("messageTypes")]
        public IActionResult GetMessageTypes()
        {
            return Ok(EnumUtility.GetDictionaryFromEnum<MessageType>());
        }

        [HttpGet, Route("serviceTypes")]
        public IActionResult GetServiceTypes()
        {
            return Ok(EnumUtility.GetDictionaryFromEnum<ServiceType>());
        }
    }
}
