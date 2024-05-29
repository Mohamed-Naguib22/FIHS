using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIHS.Tests
{
    public class InMemoryDbContext : ApplicationDbContext
    {
        public InMemoryDbContext() : base(InMemoryDbContextOptions.Options)
        {
        }
        public InMemoryDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured) 
                optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        }
        public override void Dispose()
        {
            Database.EnsureDeleted();
            base.Dispose();
        }
    }
}
