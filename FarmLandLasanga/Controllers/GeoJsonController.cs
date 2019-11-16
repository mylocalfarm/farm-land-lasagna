using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Collections.Generic;
using System;

namespace FarmLandLasanga.Controllers
{
    [Route("api/[controller]")]
    public class GeoJsonController : Controller
    {
        private Dictionary<string, string> MapLayerURIs = new Dictionary<string, string>
        {
            { "alr", "https://drive.google.com/uc?id=1PzuT_jnN_glJb1mj-Bb4BdvnuOW4GrWu" }
        };

        /**
         * Example http://locahost:5000/api/geojson/alr
         */
        [HttpGet("{id}")]
        public async Task<ContentResult> Get(string id)
        {
            if (!MapLayerURIs.TryGetValue(id, out string publicFile))
            {
                throw new ArgumentOutOfRangeException(id);
            }

            var httpClient = new HttpClient();
            var result = await httpClient.GetAsync(publicFile);
            var json = await result.Content.ReadAsStringAsync(); ;
            return Content(json, "application/json");
        }
    }
}
