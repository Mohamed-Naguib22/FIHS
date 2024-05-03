using FIHS.Models;
using FIHS.Models.ArticleModels;
using FIHS.Models.AuthModels;
using FIHS.Models.DiseaseModels;
using FIHS.Models.FavouriteModels;
using FIHS.Models.Fertilizer;
using FIHS.Models.PestModels;

using FIHS.Models.PesticideModels;
using FIHS.Models.PlantModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FIHS.Models.CommentModels;

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
        modelBuilder.Entity<PlantsDiseases>().HasKey(pd => new { pd.PlantId, pd.DiseaseId });
        modelBuilder.Entity<FavouritePlant>().HasKey(fp => new { fp.PlantId, fp.FavouriteId });
        modelBuilder.Entity<PlantsPests>().HasKey(pp => new { pp.PlantId, pp.PestId });
        modelBuilder.Entity<PestsPesticides>().HasKey(pp => new { pp.PesticideId, pp.PestId });
        // Define foreign key relationship for Comment entity



        modelBuilder.Entity<Pesticide>().HasIndex(n => n.Name).IsUnique();
        modelBuilder.Entity<Fertilizer>().HasIndex(n => n.Name).IsUnique();
    }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleSection> ArticleSections { get; set; }
    public DbSet<ArticleTag> ArticleTags { get; set; }
    public DbSet<ArticleLike> ArticleLikes { get; set; }
    public DbSet<Plant> Plants { get; set; }
    public DbSet<PlantType> PlantTypes { get; set; }
    public DbSet<PlantsTypesOfPlant> PlantTypesOfPlant { get; set;}
    public DbSet<Soil> Soils { get; set; }
    public DbSet<Pesticide> Pesticides { get; set; }
    public DbSet<Fertilizer> Fertilizers { get; set; }
    public DbSet<Pest> Pests { get; set; }
    public DbSet<Disease> Diseases { get; set; }
    public DbSet<Favourite> Favourites { get; set; }
    public DbSet<FavouritePlant> FavouritePlants { get; set; }
    public DbSet<Comment> Comments { get; set; }
}