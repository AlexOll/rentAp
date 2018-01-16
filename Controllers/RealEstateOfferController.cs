using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class RealEstateOfferController : ApiController
    {
        private readonly RealEstateOfferManager _offerManager;
        private readonly RealEstateManager _realEstateManager;

        public RealEstateOfferController(RealEstateOfferManager offerManager, RealEstateManager realEstateManager)
        {
            _offerManager = offerManager;
            _realEstateManager = realEstateManager;
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

        // Send POST request http://localhost:63225/api/realestateoffer/testdata using postman
        [HttpPost("{placeholder}", Name = "testdata")]
        public IActionResult AddTestData(int placeholder)
        {
            AccommodationDetailes det1 = new AccommodationDetailes
            {
                Floor = 2,
                Balcony = true,
                Terrace = false
            };
            RealEstateObject obj1 = new RealEstateObject
            {
                Description = "Description 1",
                Address = "Kyiv, Lva Tolstogo sq. 1",
                Area = 66,
                Lat = -37.765015,
                Lng = 145.133858,
                PropertyType = PropertyType.Appartment,
                RealEstateDetailes = det1,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                IsAlive = true
            };
            RealEstatePhoto p1 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
            RealEstatePhoto p2 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
            RealEstatePhoto p3 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
            obj1.Photos = new List<RealEstatePhoto> { p1, p2, p3 };

            RealEstateOffer offer1 = new RealEstateOffer
            {
                Price = 6666,
                ServiceType = ServiceType.LTOfferRental,
                RealEstateObject = obj1,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                IsAlive = true
            };
            _offerManager.Create(offer1);

            return Ok(null);
        }
    }
}
