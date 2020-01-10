using System.Text.Json.Serialization;
using System.Threading.Tasks;
using FarmLandLasanga.Services;
using Microsoft.AspNetCore.Mvc;

namespace FarmLandLasanga.Controllers
{
    public class LoginMessage
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
    }

    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private IEmailService _emailService;

        public LoginController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        // curl -k 'https://localhost:5001/api/login' -H 'Content-Type: application/json' --data '{ "email": "shaun@bigfont.ca" }'
        // curl -k 'https://localhost:5001/api/login' -H 'Content-Type: application/json' --data '{ "email": "jesse@burtonmediainc.com" }'
        [HttpPost()]
        public async Task<JsonResult> Post([FromBody]LoginMessage loginMessage)
        {
            await Task.CompletedTask;
            System.Console.WriteLine(loginMessage);

            _emailService.SendOneTimePassword(loginMessage.Email);

            return Json(loginMessage);
        }

        // curl -k 'https://localhost:5001/api/login/some-one-time-password'
        [HttpGet("{password}")]
        public async Task<JsonResult> Get(string password)
        {
            await Task.CompletedTask;
            System.Console.WriteLine(password);

            var tokens = _emailService.ProcessOneTimePassword(password);

            return Json(tokens);
        }
    }
}
