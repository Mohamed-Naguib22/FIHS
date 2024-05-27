using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCommentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "EntityType",
                table: "Comments");


            migrationBuilder.AddColumn<int>(
                name: "DiseaseId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PestId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlantId",
                table: "Comments",
                type: "int",
                nullable: true);

          
            migrationBuilder.CreateIndex(
                name: "IX_Comments_DiseaseId",
                table: "Comments",
                column: "DiseaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PestId",
                table: "Comments",
                column: "PestId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PlantId",
                table: "Comments",
                column: "PlantId");


            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Diseases_DiseaseId",
                table: "Comments",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Pests_PestId",
                table: "Comments",
                column: "PestId",
                principalTable: "Pests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Plants_PlantId",
                table: "Comments",
                column: "PlantId",
                principalTable: "Plants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Diseases_DiseaseId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Pests_PestId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Plants_PlantId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_DiseaseId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_PestId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_PlantId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "DiseaseId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "PestId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "PlantId",
                table: "Comments");

            migrationBuilder.AddColumn<int>(
                name: "EntityId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EntityType",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
