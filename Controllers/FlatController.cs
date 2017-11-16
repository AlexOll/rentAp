using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class FlatController: ApiController
    {
        private readonly FlatManager _flatManager;

        public FlatController(FlatManager flatManager)
        {
            _flatManager = flatManager;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Flat>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _flatManager.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Flat item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await _flatManager.Create(item);

            return Ok(result);
        }
    }
}
