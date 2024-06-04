using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIHS.Migrations
{
    /// <inheritdoc />
    public partial class seedPlants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Plants",
                columns: new[] { "Name", "ScientificName", "Description", "Color", "CommonUses", "NutritionalValue", "AverageYield", "SunlightReqs", "IrrigationReqs", "Temperature", "PlantingSeason", "HarvistingSeason", "CulivationTips", "ImageUrl" },
                values: new object[,]
                {
        { "ريحان", "Ocimum basilicum", "عشب طهي من عائلة النعناع", "أخضر", "الطبخ والعلاج بالأعشاب", "غني بمضادات الأكسدة", 0.6, "ضوء الشمس الكامل", "الري المعتدل", "20-30°C", "الربيع", "الصيف", "قم بقرص الأزهار لتعزيز نمو الأوراق", "\\images\\No_Image.jpg" },
        { "بقدونس", "Petroselinum crispum", "عشب يستخدم في الطهي", "أخضر", "الطهي والزينة", "غني بفيتامين K", 0.8, "ضوء الشمس الجزئي إلى الكامل", "الري المنتظم", "10-25°C", "الربيع", "الصيف", "احصد الأوراق بانتظام لتعزيز النمو", "\\images\\No_Image.jpg" },
        { "نعناع", "Mentha", "عشب عطري يستخدم في الطهي", "أخضر", "الطهي والعلاج بالأعشاب", "غني بمضادات الأكسدة", 0.9, "ضوء الشمس الجزئي", "الري المنتظم", "15-25°C", "الربيع", "الصيف", "قم بزراعة النعناع في تربة رطبة", "\\images\\No_Image.jpg" },
        { "زعتر", "Thymus vulgaris", "عشب يستخدم في الطهي", "أخضر", "الطهي والعلاج بالأعشاب", "غني بالفيتامينات والمعادن", 0.4, "ضوء الشمس الكامل", "الري المعتدل", "20-30°C", "الربيع", "الصيف", "قم بزراعة الزعتر في تربة جيدة التصريف", "\\images\\No_Image.jpg" },
        { "حبق", "Ocimum tenuiflorum", "عشب يستخدم في الطهي والعلاج", "أخضر", "الطهي والعلاج بالأعشاب", "غني بمضادات الأكسدة", 0.6, "ضوء الشمس الكامل", "الري المنتظم", "20-30°C", "الربيع", "الصيف", "قم بقرص الأزهار لتعزيز نمو الأوراق", "\\images\\No_Image.jpg" },
        { "بابونج", "Matricaria chamomilla", "عشب يستخدم في العلاج بالأعشاب", "أصفر وأبيض", "العلاج بالأعشاب والشاي", "غني بمضادات الأكسدة", 0.3, "ضوء الشمس الكامل", "الري المعتدل", "15-25°C", "الربيع", "الصيف", "احصد الأزهار عند تفتحها بالكامل", "\\images\\No_Image.jpg" },
        { "مردقوش", "Origanum majorana", "عشب يستخدم في الطهي", "أخضر", "الطهي والعلاج بالأعشاب", "غني بالفيتامينات والمعادن", 0.5, "ضوء الشمس الكامل", "الري المعتدل", "20-30°C", "الربيع", "الصيف", "قم بزراعة المردقوش في تربة جيدة التصريف", "\\images\\No_Image.jpg" },
        { "كركم", "Curcuma longa", "عشب يستخدم في الطهي والعلاج", "أصفر", "الطهي والعلاج بالأعشاب", "غني بمضادات الأكسدة", 1.2, "ضوء الشمس الكامل", "الري المعتدل", "20-30°C", "الربيع", "الصيف", "احفظ الجذور في مكان بارد وجاف بعد الحصاد", "\\images\\No_Image.jpg" }
                }
            );

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Plants]");
        }
    }
}
