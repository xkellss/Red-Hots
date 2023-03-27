using Server.Models.Authentication;
using System.Text.Json.Serialization;

namespace SalernoServer.Models
{
    public class Order
    {
        public long OrderId { get; set; }
        public CustomerAccount CustomerAccount { get; set; }
        public decimal Subtotal { get; set; } = 0;
        public decimal SubtotalTax { get; set; } = 0;
        public decimal Total { get; set; } = 0;
        public string Status { get; set; } = "Pending";
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime? PickUpDate { get; set; } = null;
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
