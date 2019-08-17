using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace FarmLandLasanga.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public async Task<ContentResult> GeoJSON()
        {
            var rootDirectory = Directory.GetCurrentDirectory();
            var mapDataDirectory = Path.Combine(rootDirectory, "MapData");
            var filePath = Path.Combine(mapDataDirectory, "geoJSON.json");
            var json = await System.IO.File.ReadAllTextAsync(filePath);
            return Content(json, "application/json");
        }
    }
}
