using System.Text.Json.Serialization;
using System.Threading.Tasks;
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
        // https://localhost:5001/api/login
        // { "email": "shaun@bigfont.ca" }
        [HttpPost()]
        public async Task<JsonResult> Post([FromBody]LoginMessage loginMessage)
        {
            await Task.CompletedTask;
            System.Console.WriteLine(loginMessage);
            return Json(loginMessage);
        }

        // https://localhost:5001/api/login/some-one-time-password
        [HttpGet("{password}")]
        public async Task<ContentResult> Get(string password)
        {
            await Task.CompletedTask;
            System.Console.WriteLine(password);
            return Content(password);
        }
    }
}
