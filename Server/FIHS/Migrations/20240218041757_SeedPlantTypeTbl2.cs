using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class SeedPlantTypeTbl2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات العشبية المعمرة", "تختلف", "يختلف اعتمادًا على النوع", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "الأشجار المعمرة", "من عدة أمتار إلى عدة عشرات الأمتار", "تختلف", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "الشجيرات الدائمة الخضرة", "تختلف", "تختلف", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات العصارية", "من عدة سنتيمترات إلى عدة أمتار", "يختلف اعتمادًا على النوع", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات المتسلقة", "تختلف", "تختلف", "سنوية أو معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "الأشجار المخروطية", "من عدة أمتار إلى عدة عشرات الأمتار", "تختلف", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات المائية", "يختلف", "يختلف", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات البرية", "تختلف", "تختلف", "سنوية أو معمرة" }
            );
            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات المعتدلة", "تختلف", "تختلف", "معمرة" }
            );

            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "النباتات الصحراوية", "من عدة سنتيمترات إلى عدة أمتار", "تختلف", "معمرة" }
            );
            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "خضروات", "مجهول", "مجهول", "مجهول" }
            );
            migrationBuilder.InsertData(
                table: "PlantTypes",
                columns: new[] { "Name", "HeightRange", "SpreadRange", "LifeCycle" },
                values: new object[] { "فواكة", "مجهول", "مجهول", "مجهول" }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [PlantTypes]");
        }
    }
}
