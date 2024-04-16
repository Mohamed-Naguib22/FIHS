using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class PlantsPestsRelationTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlantsPests",
                columns: table => new
                {
                    PlantId = table.Column<int>(type: "int", nullable: false),
                    PestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantsPests", x => new { x.PlantId, x.PestId });
                    table.ForeignKey(
                        name: "FK_PlantsPests_Pests_PestId",
                        column: x => x.PestId,
                        principalTable: "Pests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlantsPests_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlantsPests_PestId",
                table: "PlantsPests",
                column: "PestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantsPests");
        }
    }
}
