using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class OrderNetToTotal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tax",
                table: "Orders",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "Net",
                table: "Orders",
                newName: "SubtotalTax");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Total",
                table: "Orders",
                newName: "Tax");

            migrationBuilder.RenameColumn(
                name: "SubtotalTax",
                table: "Orders",
                newName: "Net");
        }
    }
}
