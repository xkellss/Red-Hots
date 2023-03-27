using SalernoServer.Models.ItemModels;
using System.Text.Json.Serialization;
using SalernoServer.Models;

namespace SalernoServer.Models
{
    public class OrderItemGroup
    {
        [JsonIgnore]
        public OrderItem OrderItem { get; set; }
        public Group Group { get; set; }
        public GroupOption GroupOption { get; set; }
    }
}
