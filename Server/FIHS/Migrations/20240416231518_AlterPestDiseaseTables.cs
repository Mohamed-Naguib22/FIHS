using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class AlterPestDiseaseTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ScientificName",
                table: "Pests",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Causes",
                table: "Diseases",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ScientificName",
                table: "Diseases",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Species",
                table: "Diseases",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScientificName",
                table: "Pests");

            migrationBuilder.DropColumn(
                name: "Causes",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "ScientificName",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "Species",
                table: "Diseases");
        }
    }
}
