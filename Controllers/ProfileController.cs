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
        public async Task<IActionResult> GetAllUserMessages(Guid id)
        {
            var result = await
                Task.Factory.StartNew(() => _profileManager.GetAllUserMessages(id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody]SendMessageRequest message)
        {
            if (message == null)
            {
                return BadRequest();
            }
            var result = await _profileManager.SendMessage(message);

            return Ok(result);
        }
    }
}
