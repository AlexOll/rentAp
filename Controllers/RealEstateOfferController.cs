using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class RealEstateOfferController : ApiController
    {
        private readonly RealEstateOfferManager _offerManager;

        public RealEstateOfferController(RealEstateOfferManager offerManager)
        {
            _offerManager = offerManager;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<RealEstateOffer>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var result = await Task.Factory.StartNew(() => _offerManager.GetAll());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var item = _offerManager.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RealEstateOffer item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.Create(item));
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] RealEstateOffer item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.Update(item));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var item = _offerManager.GetById(id);
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.Remove(id));
            return Ok(result);
        }
    }
}
