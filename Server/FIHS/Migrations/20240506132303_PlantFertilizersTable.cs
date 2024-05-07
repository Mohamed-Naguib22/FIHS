using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class PlantFertilizersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Pesticides");

            migrationBuilder.DropColumn(
                name: "NutrientContent",
                table: "Fertilizers");

            migrationBuilder.DropColumn(
                name: "price",
                table: "Fertilizers");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Fertilizers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PlantFertilizers",
                columns: table => new
                {
                    PlantId = table.Column<int>(type: "int", nullable: false),
                    FertilizerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantFertilizers", x => new { x.PlantId, x.FertilizerId });
                    table.ForeignKey(
                        name: "FK_PlantFertilizers_Fertilizers_FertilizerId",
                        column: x => x.FertilizerId,
                        principalTable: "Fertilizers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlantFertilizers_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlantFertilizers_FertilizerId",
                table: "PlantFertilizers",
                column: "FertilizerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantFertilizers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Fertilizers");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Pesticides",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutrientContent",
                table: "Fertilizers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "price",
                table: "Fertilizers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
