using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Web;
using FarmLandLasanga.Services;
using Microsoft.AspNetCore.Identity;
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
        private const string TokenPurpose = "passwordless-auth";

        private IEmailService _emailService;

        private UserManager<IdentityUser> _userManager;

        public LoginController(IEmailService emailService, UserManager<IdentityUser> userManager)
        {
            _emailService = emailService;
            _userManager = userManager;
        }

        // curl -k 'https://localhost:5001/api/login' -H 'Content-Type: application/json' --data '{ "email": "shaun@bigfont.ca" }'
        // curl -k 'https://localhost:5001/api/login' -H 'Content-Type: application/json' --data '{ "email": "jesse@burtonmediainc.com" }'
        [HttpPost()]
        public async Task<JsonResult> GenerateToken([FromBody]LoginMessage loginMessage)
        {
            var user = await _userManager.FindByEmailAsync(loginMessage.Email);
            if (user == null)
            {
                await _userManager.CreateAsync(new IdentityUser
                {
                    UserName = loginMessage.Email,
                    Email = loginMessage.Email
                });

                user = await _userManager.FindByEmailAsync(loginMessage.Email);
            }

            var token = await _userManager.GenerateUserTokenAsync(user, "Default", TokenPurpose);

            var isValid = await _userManager.VerifyUserTokenAsync(user, "Default", TokenPurpose, token);

            token = await _userManager.GenerateUserTokenAsync(user, "Default", TokenPurpose);

            if (!isValid) throw new System.Exception();

            var magicLink = Url.Action(
                "ValidateToken",
                "Login",
                new { email = loginMessage.Email, password = HttpUtility.UrlEncode(token) },
                "https"
            );

            _emailService.SendOneTimePassword(loginMessage.Email, magicLink);

            return Json(new
            {
                token,
                magicLink
            });
        }

        // curl -k 'https://localhost:5001/api/login/some-one-time-password'
        [HttpGet("{email}/{password}")]
        public async Task<JsonResult> ValidateToken(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var result = await _userManager.VerifyUserTokenAsync(user, "Default", TokenPurpose, HttpUtility.UrlDecode(password));

            System.Console.WriteLine(result);

            return Json(new
            {
                result,
                token = HttpUtility.UrlDecode(password)
            });
        }
    }
}
