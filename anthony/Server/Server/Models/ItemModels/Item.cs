using Server.Models.ItemModels;

namespace SalernoServer.Models.ItemModels
{
    public class Item
    {
        public string ItemId { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public Category Category { get; set; }
        public string UPC { get; set; }
        public string SKU { get; set; }
        public decimal Price { get; set; }
        public bool Discountable { get; set; } = false;
        public bool Taxable { get; set; } = false;
        public bool TrackingInventory { get; set; } = false;
        public decimal Cost { get; set; }
        public decimal AssignedCost { get; set; }
        public int Quantity { get; set; }
        public int ReorderTrigger { get; set; }
        public int RecommendedOrder { get; set; }
        public DateTime LastSoldDate { get; set; } = DateTime.Now;
        public string Supplier { get; set; }
        public bool LiabilityItem { get; set; } = false;
        public string LiabilityRedemptionTender { get; set; }
        public string TaxGroupOrRate { get; set; }
        public virtual Modifier Modifier { get; set; } = new();
    }
}
