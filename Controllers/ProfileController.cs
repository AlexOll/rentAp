using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using System;
using System.Threading.Tasks;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : ApiController
    {
        private readonly ProfileManager _profileManager;

        public ProfileController(ProfileManager profileManager)
        {
            _profileManager = profileManager;
        }

        [HttpGet, Route("usermessages/{id}")]
        public async Task<IActionResult> GetUserMessages(Guid id)
        {
            var result = await
                Task.Factory.StartNew(() => _profileManager.GetUserMessages(id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SendChatMessage([FromBody]SendMessageRequest message)
        {
            if (message == null)
            {
                return BadRequest();
            }
            var result = await _profileManager.SendChatMessage(message);

            return Ok(result);
        }

        [HttpPut, Route("updateonlinestatus/{value}")]
        public async Task<IActionResult> UpdateOnlineStatus([FromRoute]Guid value)
        {
            await Task.Factory.StartNew(() => _profileManager.UpdateOnlineStatus(value));

            return NoContent();
        }
    }
}
