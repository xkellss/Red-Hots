using System.Text.Json.Serialization;
using SalernoServer.Models.ItemModels;

namespace SalernoServer.Models
{
    public class OrderItemNoOption
    {
        [JsonIgnore]
        public OrderItem OrderItem { get; set; }
        public NoOption NoOption { get; set; }
    }
}
