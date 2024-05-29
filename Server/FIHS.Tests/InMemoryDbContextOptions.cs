using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIHS.Tests
{
    public static class InMemoryDbContextOptions
    {
        private static DbContextOptions<ApplicationDbContext> _options;
        static InMemoryDbContextOptions()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
        }
        public static DbContextOptions<ApplicationDbContext> Options => _options;
    }
}
