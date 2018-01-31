using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
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
        private readonly RealEstateOfferManager _offerManager;
        private readonly RealEstateManager _realEstateManager;

        public OfferController(RealEstateOfferManager offerManager, RealEstateManager realEstateManager)
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

        //// Send POST request http://localhost:63225/api/realestateoffer/testdata using postman
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
        //        ServiceType = ServiceType.LTOfferRental,
        //        RealEstateObject = obj1,
        //        CreateDate = DateTime.Now,
        //        UpdateDate = DateTime.Now,
        //        IsAlive = true
        //    };
        //    _offerManager.Create(offer1);

        //    //AccommodationDetailes det2 = new AccommodationDetailes
        //    //{
        //    //    Floor = 2,
        //    //    Balcony = true,
        //    //    Terrace = false
        //    //};
        //    //RealEstateObject obj2 = new RealEstateObject
        //    //{
        //    //    Description = "Description 2",
        //    //    Address = "Kyiv, Address 2",
        //    //    Area = 55,
        //    //    Lat = 50.397289,
        //    //    Lng = 30.510895,
        //    //    PropertyType = PropertyType.Appartment,
        //    //    RealEstateDetailes = det2,
        //    //    CreateDate = DateTime.Now,
        //    //    UpdateDate = DateTime.Now,
        //    //    IsAlive = true
        //    //};
        //    //RealEstatePhoto p21 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
        //    //RealEstatePhoto p22 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
        //    //RealEstatePhoto p23 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj2.Id };
        //    //obj2.Photos = new List<RealEstatePhoto> { p21, p22, p23 };

        //    //RealEstateOffer offer2 = new RealEstateOffer
        //    //{
        //    //    Price = 1500,
        //    //    ServiceType = ServiceType.OfferSale,
        //    //    RealEstateObject = obj2,
        //    //    CreateDate = DateTime.Now,
        //    //    UpdateDate = DateTime.Now,
        //    //    IsAlive = true
        //    //};
        //    //_offerManager.Create(offer2);

        //    //AccommodationDetailes det3 = new AccommodationDetailes
        //    //{
        //    //    Floor = 2,
        //    //    Balcony = true,
        //    //    Terrace = false
        //    //};
        //    //RealEstateObject obj3 = new RealEstateObject
        //    //{
        //    //    Description = "Description 3",
        //    //    Address = "Kyiv, Address 3",
        //    //    Area = 66,
        //    //    Lat = 50.450750,
        //    //    Lng = 30.525068,
        //    //    PropertyType = PropertyType.Appartment,
        //    //    RealEstateDetailes = det3,
        //    //    CreateDate = DateTime.Now,
        //    //    UpdateDate = DateTime.Now,
        //    //    IsAlive = true
        //    //};
        //    //RealEstatePhoto p31 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
        //    //RealEstatePhoto p32 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
        //    //RealEstatePhoto p33 = new RealEstatePhoto { Url = "../../img/flat/noImage.jpg", RealEstateId = obj3.Id };
        //    //obj3.Photos = new List<RealEstatePhoto> { p31, p32, p33 };

        //    //RealEstateOffer offer3 = new RealEstateOffer
        //    //{
        //    //    Price = 1800,
        //    //    ServiceType = ServiceType.OfferSale,
        //    //    RealEstateObject = obj3,
        //    //    CreateDate = DateTime.Now,
        //    //    UpdateDate = DateTime.Now,
        //    //    IsAlive = true
        //    //};
        //    //_offerManager.Create(offer3);

        //    return Ok(null);
        //}
        //}

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("1/1")]
        public async Task<IActionResult> CreateSaleAppartment([FromBody] SaleAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/1")]
        public async Task<IActionResult> UpdateSaleAppartment([FromBody] SaleAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("1/2")]
        public async Task<IActionResult> CreateSaleHouse([FromBody] SaleHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/2")]
        public async Task<IActionResult> UpdateSaleHouse([FromBody] SaleHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("1/3")]
        public async Task<IActionResult> CreateSaleLand([FromBody] SaleLandRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/3")]
        public async Task<IActionResult> UpdateSaleLand([FromBody] SaleLandRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("1/4")]
        public async Task<IActionResult> CreateSaleGarage([FromBody] SaleGarageRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/4")]
        public async Task<IActionResult> UpdateSaleGarage([FromBody] SaleGarageRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("1/5")]
        public async Task<IActionResult> CreateSaleOffice([FromBody] SaleOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/5")]
        public async Task<IActionResult> UpdateSaleOffice([FromBody] SaleOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("1/6")]
        public async Task<IActionResult> CreateSaleCommertial([FromBody] SaleCommertialRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("1/6")]
        public async Task<IActionResult> UpdateSaleCommertial([FromBody] SaleCommertialRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("2/1")]
        public async Task<IActionResult> CreateLTRenAppartment([FromBody] LTRenAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/1")]
        public async Task<IActionResult> UpdateLTRenAppartment([FromBody] LTRenAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("2/2")]
        public async Task<IActionResult> CreateLTRentHouse([FromBody] LTRentHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/2")]
        public async Task<IActionResult> UpdateLTRentHouse([FromBody] LTRentHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("2/3")]
        public async Task<IActionResult> CreateLTRentLand([FromBody] LTRentLandRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/3")]
        public async Task<IActionResult> UpdateLTRentLand([FromBody] LTRentLandRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("2/4")]
        public async Task<IActionResult> CreateLTRentGarage([FromBody] LTRentGarageRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/4")]
        public async Task<IActionResult> UpdateLTRentGarage([FromBody] LTRentGarageRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("2/5")]
        public async Task<IActionResult> CreateLTRentOffice([FromBody] LTRentOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/5")]
        public async Task<IActionResult> UpdateLTRentOffice([FromBody] LTRentOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("2/6")]
        public async Task<IActionResult> CreateLTRentCommertial([FromBody] LTRentCommertialRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("2/6")]
        public async Task<IActionResult> UpdateLTRentCommertial([FromBody] LTRentCommertialRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("3/1")]
        public async Task<IActionResult> CreateSTRenAppartment([FromBody] STRenAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("3/1")]
        public async Task<IActionResult> UpdateSTRenAppartment([FromBody] STRenAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("3/2")]
        public async Task<IActionResult> CreateSTRentHouse([FromBody] STRentHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("3/2")]
        public async Task<IActionResult> UpdateSTRentHouse([FromBody] STRentHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("3/5")]
        public async Task<IActionResult> CreateSTRentOffice([FromBody] STRentOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("3/5")]
        public async Task<IActionResult> UpdateSTRentOffice([FromBody] STRentOfficeRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("4/1")]
        public async Task<IActionResult> CreateRoommateAppartment([FromBody] RoommateAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("4/1")]
        public async Task<IActionResult> UpdateRoommateAppartment([FromBody] RoommateAppartmentRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPost("4/2")]
        public async Task<IActionResult> CreateRoommateHouse([FromBody] RoommateHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }

        [HttpPut("4/2")]
        public async Task<IActionResult> UpdateRoommateHouse([FromBody] RoommateHouseRequest item)
        {
            var offer = (Offer)item;
            return Ok();
        }
    }
}
