using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RentApp.Models.DbModels;
using System;
using RentApp.Managers;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ApiController
    {

        private readonly UserManager _userManager;

        public UserController(UserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet, Route("phonenumbercheck")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> CheckUsername([FromQuery]string value)
        {
            bool result = await Task.Factory.StartNew(() => _userManager.CheckPhoneNumber(value));

            return Ok(result);
        }

        [HttpGet, Route("emailcheck")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> CheckEmail([FromQuery]string value)
        {
            bool result = await Task.Factory.StartNew(() => _userManager.CheckEmail(value));

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _userManager.Create(item));

            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _userManager.Update(item));

            return Ok(result);
        }
    }
}

