using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QSIT.Models;

namespace Angular_CRUD_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapSettingsController : ControllerBase
    {
        private readonly MapContext _mapDbContext;

        public MapSettingsController(MapContext mapDbContext)
        {
            _mapDbContext = mapDbContext;
        }

        [HttpGet]
        [Route("GetMapSettings")]
        public async Task<ActionResult<IEnumerable<MapSettings>>> GetMapSettings()
        {
            if(_mapDbContext.MapSettings == null)
            {
                return NotFound();
            }
            return await _mapDbContext.MapSettings.ToListAsync();
        }

        [HttpGet]
        [Route("GetMapSettings/{id}")]
        public async Task<ActionResult<MapSettings>> GetMapSettings(int id)
        {
            if (_mapDbContext.MapSettings == null)
            {
                return NotFound();
            }
            var map = await _mapDbContext.MapSettings.FindAsync(id);
            if(map == null)
            {
                return NotFound();
            }
            return map;
        }



        [HttpPost]
        [Route("AddSettings")]
        public async Task<ActionResult<MapSettings>> AddSettings(MapSettings mapSettings)
        {
            _mapDbContext.MapSettings.Add(mapSettings);
            await _mapDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMapSettings), new {id = mapSettings.ID }, mapSettings);
        }

        [HttpPatch]
        [Route("UpdateSettings/{id}")]
        public async Task<IActionResult>  UpdateSettings(int id , MapSettings mapSettings)
        {
            if(id != mapSettings.ID)
            {
                return BadRequest();
            }
            _mapDbContext.Entry(mapSettings).State = EntityState.Modified;
            try
            {
                await _mapDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MapAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }
        private bool MapAvailable(int id)
        {
            return (_mapDbContext.MapSettings?.Any(x => x.ID == id)).GetValueOrDefault();
        }

        [HttpDelete]
        [Route("DeleteSettings/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var mapsettings = _mapDbContext.MapSettings.Find(id);
            if (mapsettings != null)
            {
                a = true;
                _mapDbContext.Entry(mapsettings).State = EntityState.Deleted;
                _mapDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }

    }
}
