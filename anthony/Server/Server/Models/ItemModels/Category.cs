using SalernoServer.Models.ItemModels;

namespace Server.Models.ItemModels
{
    public class Category
    {
        public long CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public List<Item> Items { get; set; } = new();
    }
}
