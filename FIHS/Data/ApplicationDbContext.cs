using FIHS.Models;
using FIHS.Models.Plant;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationUser>().ToTable("Users", "security");
        modelBuilder.Entity<IdentityRole>().ToTable("Roles", "security");
        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "security");
        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims", "security");
        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins", "security");
        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims", "security");
        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens", "security");
        modelBuilder.Entity<PlantsTypesOfPlant>().HasKey(ptypes => new { ptypes.PlantId, ptypes.PlantTypeId });
        modelBuilder.Entity<PlantSoilTypes>().HasKey(ps => new { ps.PlantId, ps.SoilId });
    }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleSection> ArticleSections { get; set; }
    public DbSet<Plant> Plants { get; set; }
    public DbSet<PlantType> PlantTypes { get; set; }
    public DbSet<PlantsTypesOfPlant> PlantTypesOfPlant { get; set;}
    public DbSet<Soil> Soils { get; set; }

}