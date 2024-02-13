using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class seedingSoils : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] {  "Name", "Texture", "Structure" , "pHLevel" , "NutrientContent" , "OrganicMatter", "MoistureRetention", "Drainage",
                "CationExchangeCapacity","ImgUrl"},
                values: new object[] { "التربة الطينية","طينية","متماسكة","قلوية الي متعادلة","متوسط الي عالي","مرتفع","مرتفع","ضعيف","مرتفعة","No_Image.PNG" }
                );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Soils]");
        }
    }
}
