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

        [HttpGet, Route("usernamecheck")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> CheckUsername([FromQuery]string value)
        {
            bool result = await Task.Factory.StartNew(() => _userManager.CheckUsername(value));

            return Ok(result);
        }
        [HttpGet, Route("emailcheck")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> CheckEmail([FromQuery]string value)
        {
            bool result = await Task.Factory.StartNew(() => _userManager.CheckEmailAsync(value));

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] User item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            //var user = _userManager.GetById(id);
            User user = null;
            if (user == null)
            {
                return NotFound();
            }

            //await _userManager.Update(item);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            //var user = _userManager.GetById(id);
            User user = null;
            if (user == null)
            {
                return NotFound();
            }
            //await _userManager.Delete(id);
            return new NoContentResult();
        }
    }
}

