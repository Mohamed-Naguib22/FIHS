using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class seedFirstPlantType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات العشبية سنوية", "من عدة سنتيمترات إلى عدة أمتار", "يختلف اعتمادًا على النوع", "سنوية" }
                );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [PlantTypes]");
        }
    }
}
