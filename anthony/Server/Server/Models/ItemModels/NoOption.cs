using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class NoOption
    {
        public long NoOptionId { get; set; }
        public string Name { get; set; }
        public decimal DiscountPrice { get; set; }
        [JsonIgnore]
        public Modifier Modifier { get; set; }
    }
}
