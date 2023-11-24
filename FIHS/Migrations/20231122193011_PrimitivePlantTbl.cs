using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class PrimitivePlantTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommonUses = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    NutritionalValue = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    AverageYield = table.Column<double>(type: "float", nullable: false),
                    SunlightReqs = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    IrrigationReqs = table.Column<double>(type: "float", maxLength: 128, nullable: false),
                    CulivationTips = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plants_Name",
                table: "Plants",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Plants");
        }
    }
}
