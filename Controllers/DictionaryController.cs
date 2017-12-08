using Microsoft.AspNetCore.Mvc;
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
            return Ok(EnumExtensionHelper.GetDictionaryFromEnum<MessageType>());
        }
    }
}
