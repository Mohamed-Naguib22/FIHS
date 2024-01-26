using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class SoilTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Soils",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Texture = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    Structure = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    pHLevel = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    NutrientContent = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    OrganicMatter = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    MoistureRetention = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    Drainage = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    CationExchangeCapacity = table.Column<string>(type: "nvarchar(124)", maxLength: 124, nullable: false),
                    ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soils", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Soils");
        }
    }
}
