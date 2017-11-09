
using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using System.Threading.Tasks;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;

namespace RentApp.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : ApiController
    {

        private readonly UserManager _userManager;

        public AuthenticationController(UserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Authentificate([FromBody] AuthenticationRequest input)
        {
            if (input == null)
            {
                return BadRequest();
            }

            var result = await _userManager.Authentificate(input);

            return Ok(result);
        }   
    }
}

