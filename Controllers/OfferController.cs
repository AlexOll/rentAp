using Autofac.Features.Indexed;
using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using RentApp.Models.Interfaces;
using RentApp.Models.RequestModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class OfferController : ApiController
    {
        private readonly OfferManager _offerManager;


        public OfferController(OfferManager offerManager)
        {
            _offerManager = offerManager;
        }

        //[HttpGet]
        //[ProducesResponseType(typeof(List<RealEstateOffer>), 200)]
        //public async Task<IActionResult> GetAll()
        //{
        //    var result = await Task.Factory.StartNew(() => _offerManager.GetAll());
        //    return Ok(result);
        //}

        //[HttpGet("{id}")]
        //public IActionResult GetById(Guid id)
        //{
        //    var item = _offerManager.GetById(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return new ObjectResult(item);
        //}

        [HttpPost, Route("search")]
        public async Task<IActionResult> GetByFilter([FromBody] OfferFilterRequest filter)
        {
            if (filter == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.GetByFilter(filter));

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOfferRequest item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _offerManager.Create(item));
            return Ok(result);
        }

        //[HttpPut]
        //public async Task<IActionResult> Update([FromBody] RealEstateOffer item)
        //{
        //    if (item == null)
        //    {
        //        return BadRequest();
        //    }

        //    var result = await Task.Factory.StartNew(() => _offerManager.Update(item));
        //    return Ok(result);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var item = _offerManager.GetById(id);
        //    if (item == null)
        //    {
        //        return BadRequest();
        //    }

        //    var result = await Task.Factory.StartNew(() => _offerManager.Remove(id));
        //    return Ok(result);
        //}

        // Send POST request http://localhost:63225/api/realestateoffer/testdata using postman
        //[HttpPost("{placeholder}", Name = "testdata")]
        //public IActionResult AddTestData(int placeholder)
        //{
        //    AccommodationDetailes det1 = new AccommodationDetailes
        //    {
        //        Floor = 2,
        //        Balcony = true,
        //        Terrace = false
        //    };
        //    RealEstateObject obj1 = new RealEstateObject
        //    {
        //        Description = "Description 1",
        //        Address = "Kyiv, Lva Tolstogo sq. 1",
        //        Area = 66,
        //        Lat = -37.765015,
        //        Lng = 145.133858,
        //        PropertyType = PropertyType.Appartment,
        //        RealEstateDetailes = det1,
        //        CreateDate = DateTime.Now,
        //        UpdateDate = DateTime.Now,
        //        IsAlive = true
        //    };
        //    RealEstatePhoto p1 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
        //    RealEstatePhoto p2 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
        //    RealEstatePhoto p3 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj1.Id };
        //    obj1.Photos = new List<RealEstatePhoto> { p1, p2, p3 };

        //    RealEstateOffer offer1 = new RealEstateOffer
        //    {
        //        Price = 6666,
        //        OfferType = OfferType.LongTermRent,
        //        RealEstateObject = obj1,
        //        CreateDate = DateTime.Now,
        //        UpdateDate = DateTime.Now,
        //        IsAlive = true
        //    };
        //    _offerManager.Create(offer1);

            //AccommodationDetailes det2 = new AccommodationDetailes
            //{
            //    Floor = 2,
            //    Balcony = true,
            //    Terrace = false
            //};
            //RealEstateObject obj2 = new RealEstateObject
            //{
            //    Description = "Description 2",
            //    Address = "Kyiv, Address 2",
            //    Area = 55,
            //    Lat = 50.397289,
            //    Lng = 30.510895,
            //    PropertyType = PropertyType.Appartment,
            //    RealEstateDetailes = det2,
            //    CreateDate = DateTime.Now,
            //    UpdateDate = DateTime.Now,
            //    IsAlive = true
            //};
            //RealEstatePhoto p21 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
            //RealEstatePhoto p22 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
            //RealEstatePhoto p23 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
            //obj2.Photos = new List<RealEstatePhoto> { p21, p22, p23 };

            //RealEstateOffer offer2 = new RealEstateOffer
            //{
            //    Price = 1500,
            //    ServiceType = ServiceType.OfferSale,
            //    RealEstateObject = obj2,
            //    CreateDate = DateTime.Now,
            //    UpdateDate = DateTime.Now,
            //    IsAlive = true
            //};
            //_offerManager.Create(offer2);

            //AccommodationDetailes det3 = new AccommodationDetailes
            //{
            //    Floor = 2,
            //    Balcony = true,
            //    Terrace = false
            //};
            //RealEstateObject obj3 = new RealEstateObject
            //{
            //    Description = "Description 3",
            //    Address = "Kyiv, Address 3",
            //    Area = 66,
            //    Lat = 50.450750,
            //    Lng = 30.525068,
            //    PropertyType = PropertyType.Appartment,
            //    RealEstateDetailes = det3,
            //    CreateDate = DateTime.Now,
            //    UpdateDate = DateTime.Now,
            //    IsAlive = true
            //};
            //RealEstatePhoto p31 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
            //RealEstatePhoto p32 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
            //RealEstatePhoto p33 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
            //obj3.Photos = new List<RealEstatePhoto> { p31, p32, p33 };

            //RealEstateOffer offer3 = new RealEstateOffer
            //{
            //    Price = 1800,
            //    ServiceType = ServiceType.OfferSale,
            //    RealEstateObject = obj3,
            //    CreateDate = DateTime.Now,
            //    UpdateDate = DateTime.Now,
            //    IsAlive = true
            //};
            //_offerManager.Create(offer3);

            //return Ok(null);
        //}
    }
}
