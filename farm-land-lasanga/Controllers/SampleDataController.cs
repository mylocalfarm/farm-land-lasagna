using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http;

namespace FarmLandLasanga.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        /**
         * ~/api/sample/GeoJSON
         */
        [HttpGet("[action]")]
        public async Task<ContentResult> GeoJSON()
        {
            const string publicFile = @"https://drive.google.com/uc?id=1PzuT_jnN_glJb1mj-Bb4BdvnuOW4GrWu";
            var httpClient = new HttpClient();
            var result = await httpClient.GetAsync(publicFile);
            var json = await result.Content.ReadAsStringAsync(); ;
            return Content(json, "application/json");
        }
    }
}
