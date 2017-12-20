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
            var result = await Task.Factory.StartNew(() => _flatManager.GetAll());
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(Guid id)
        {
            var item = _flatManager.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Flat item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _flatManager.Create(item));
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Flat item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _flatManager.Update(item));
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Flat item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _flatManager.Remove(item));
            return Ok(result);
        }
    }
}
