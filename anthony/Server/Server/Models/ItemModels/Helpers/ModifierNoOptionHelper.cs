using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class ModifierNoOptionHelper
    {
        public long NoOptionId { get; set; }
        public string Name { get; set; }
        public decimal DiscountPrice { get; set; }
    }
}
