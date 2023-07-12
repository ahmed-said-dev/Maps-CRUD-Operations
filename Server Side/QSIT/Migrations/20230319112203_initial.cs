using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QSIT.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MapSettings",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MapType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MapSubType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClusterRadius = table.Column<float>(type: "real", nullable: false),
                    GeoFencing = table.Column<bool>(type: "bit", nullable: false),
                    TimeBuffer = table.Column<float>(type: "real", nullable: false),
                    LocationBuffer = table.Column<float>(type: "real", nullable: false),
                    Duration = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapSettings", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapSettings");
        }
    }
}
