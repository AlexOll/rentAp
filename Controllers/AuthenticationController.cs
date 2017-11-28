
using Microsoft.AspNetCore.Mvc;
using RentApp.Managers;
using System.Threading.Tasks;
using RentApp.Models.DbModels;
using RentApp.Models.RequestModels;
using System;

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

        [HttpGet, Route("{id}")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> ActivateAccount([FromRoute]Guid id)
        {
            var result = await Task.Factory.StartNew(() => _userManager.ActivateAccountByGuid(id));

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Authentificate([FromBody] AuthenticationRequest input)
        {
            if (input == null)
            {
                return BadRequest();
            }

            var result = await Task.Factory.StartNew(() => _userManager.Authenticate(input));

            return Ok(result);
        }

        [HttpGet, Route("forgotpassword/{email}")]
        public async Task<IActionResult> ForgotPassword([FromRoute]string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest();
            }

            await Task.Factory.StartNew(() => _userManager.RemindPasswordByEmail(email));

            return NoContent();
        }
    }
}

