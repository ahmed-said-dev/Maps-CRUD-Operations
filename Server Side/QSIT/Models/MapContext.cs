using Microsoft.EntityFrameworkCore;


namespace QSIT.Models
{

    public class MapContext : DbContext
    { 

        public MapContext(DbContextOptions<MapContext> options) : base(options)
    {

    }
    public DbSet<MapSettings> MapSettings { get; set; }
    }
}
