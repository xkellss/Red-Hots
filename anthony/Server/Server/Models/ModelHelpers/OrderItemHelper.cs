using SalernoServer.Models.ModelHelpers;

namespace SalernoServer.Models
{
    public class OrderItemHelper
    {
        public string ItemId { get; set; }
        public List<GroupOptionHelper> GroupOptions { get; set; } = new();
        public List<AddonHelper> Addons { get; set; } = new();
        public List<NoOptionHelper> NoOptions { get; set; } = new();
    }
}
