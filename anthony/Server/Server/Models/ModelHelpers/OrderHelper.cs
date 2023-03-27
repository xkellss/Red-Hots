using SalernoServer.Models.ModelHelpers;

namespace SalernoServer.Models
{
    public class OrderHelper
    {
        public long CustomerAccountId { get; set; }
        public decimal Subtotal { get; set; } = 0;
        public decimal SubtotalTax { get; set; } = 0;
        public decimal Total { get; set; } = 0;
        public string Status { get; set; } = "Pending";
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime? PickUpDate { get; set; } = null;
        public List<OrderItemHelper> OrderItems { get; set; }
    }
}
