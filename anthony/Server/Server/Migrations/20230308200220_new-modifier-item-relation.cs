using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class newmodifieritemrelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_Modifiers_ItemId",
            //    table: "Modifiers");

            //migrationBuilder.AddColumn<string>(
            //    name: "Description",
            //    table: "Groups",
            //    type: "longtext",
            //    nullable: false)
            //    .Annotation("MySql:CharSet", "utf8mb4");

            //migrationBuilder.AddColumn<bool>(
            //    name: "IsDefault",
            //    table: "GroupOptions",
            //    type: "tinyint(1)",
            //    nullable: false,
            //    defaultValue: false);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Modifiers_ItemId",
            //    table: "Modifiers",
            //    column: "ItemId",
            //    unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_Modifiers_ItemId",
            //    table: "Modifiers");

            //migrationBuilder.DropColumn(
            //    name: "Description",
            //    table: "Groups");

            //migrationBuilder.DropColumn(
            //    name: "IsDefault",
            //    table: "GroupOptions");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Modifiers_ItemId",
            //    table: "Modifiers",
            //    column: "ItemId");
        }
    }
}
