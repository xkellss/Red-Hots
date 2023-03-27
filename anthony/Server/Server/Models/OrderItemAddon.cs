using System.Text.Json.Serialization;
using SalernoServer.Models.ItemModels;

namespace SalernoServer.Models
{
    public class OrderItemAddon
    {
        [JsonIgnore]
        public OrderItem OrderItem { get; set; }
        public Addon Addon { get; set; }
    }
}
