using Autofac.Features.Indexed;
using Microsoft.AspNetCore.Mvc;
using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using RentApp.RunModules;
using RentApp.Utilities;
using System.Collections.Generic;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class DictionaryController : ApiController
    {
        [HttpGet, Route("propertytypes")]
        public IActionResult GetPropertyTypes()
        {
            return Ok(EnumUtility.GetDictionaryFromEnum<PropertyType>());
        }

        [HttpGet, Route("offerTypes")]
        public IActionResult GetOfferTypes()
        {
            return Ok(EnumUtility.GetDictionaryFromEnum<OfferType>());
        }

        //[HttpPost, Route("3")]
        //public IActionResult TEST(IIndex<PropertyType, Details> fruitCake)
        //{
        //    var test = fruitCake;
        //    return Ok(test);
        //}

        //public DictionaryController(IIndex<PropertyType, IDetails> fruitCake)
        //{
        //    var sss = fruitCake[PropertyType.Appartment];
        //}

    }
}
