using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using System;
using System.Threading.Tasks;

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

        [HttpGet]
        public async Task<IActionResult> GetAll(Guid id)
        {
            var result = await _profileManager.GetAllUserMessages(id);
            return Ok(result);
        }
    }
}
