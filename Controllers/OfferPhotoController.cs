using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class OfferPhotoController : ApiController
    {
        private readonly OfferManager _offerManager;

        public OfferPhotoController(OfferManager offerManager)
        {
            _offerManager = offerManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromBody] OfferPhoto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.AddPhoto(item));
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> RemovePhoto([FromBody] OfferPhoto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.RemovePhoto(item));
            return Ok(result);
        }
    }
}
