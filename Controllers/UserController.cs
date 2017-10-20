using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RentApp.Models;
using System.Linq;
using System;
using RentApp.Managers;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ApiController
    {
        private readonly DataContext _context;
        private readonly UserManager _userManager;


        public UserController(UserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<User>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userManager.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetById")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _userManager.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var newGuid = await _userManager.Create(item);

            return CreatedAtRoute("GetById", new { id = newGuid }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] User item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var user = await _userManager.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.Update(item);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _userManager.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            await _userManager.Delete(id);
            return new NoContentResult();
        }
    }
}

