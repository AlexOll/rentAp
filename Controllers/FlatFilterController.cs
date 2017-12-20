using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class FlatFilterController : ApiController
    {
        private readonly FlatFilterManager _flatFilterManager;

        public FlatFilterController(FlatFilterManager flatFilterManager)
        {
            _flatFilterManager = flatFilterManager;
        }

        [HttpPost]
        [ProducesResponseType(typeof(List<Flat>), 200)]
        public async Task<IActionResult> GetByFilter([FromBody] FlatFilterRequest filter)
        {
            if (filter == null)
            {
                return BadRequest();
            }

            var result = await _flatFilterManager.GetByFilter(filter);

            return Ok(result);
        }
    }
}
