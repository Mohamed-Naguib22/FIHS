using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class SeedSoilsTbl2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
        table: "Soils",
        columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
        values: new object[] { "التربة الرملية", "رملية", "هشة", "حمضية الى متعادلة", "منخفض", "منخفض", "منخفض", "جيد", "منخفضة", "No_Image.PNG" }
    );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الحصوية", "حصوية", "غير متماسكة", "متعادلة", "منخفض", "منخفض", "منخفض", "جيد", "منخفضة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الطميية", "طميية", "متماسكة", "متعادلة", "منخفض", "مرتفع", "مرتفع", "ضعيف", "مرتفعة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الطينية الرملية", "طينية رملية", "متماسكة", "متعادلة", "متوسط", "متوسط", "متوسط", "ضعيف", "متوسطة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الجيرية", "جيرية", "متماسكة", "قلوية", "مرتفع", "مرتفع", "منخفض", "جيد", "مرتفعة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الجصية", "جصية", "متماسكة", "قلوية", "منخفض", "منخفض", "منخفض", "جيد", "منخفضة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الحمضية الجيدة", "حمضية", "هشة", "حمضية", "منخفض", "منخفض", "منخفض", "جيد", "منخفضة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الجردية", "جردية", "هشة", "متعادلة", "منخفض", "منخفض", "منخفض", "جيد", "منخفضة", "No_Image.PNG" }
            );

            migrationBuilder.InsertData(
                table: "Soils",
                columns: new[] { "Name", "Texture", "Structure", "pHLevel", "NutrientContent", "OrganicMatter", "MoistureRetention", "Drainage", "CationExchangeCapacity", "ImgUrl" },
                values: new object[] { "التربة الطينية الجيرية", "طينية جيرية", "متماسكة", "قلوية", "مرتفع", "مرتفع", "مرتفع", "ضعيف", "مرتفعة", "No_Image.PNG" }
            );

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Soils]");
        }
    }
}
