using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class ModifierGroupOptionHelper
    {
        public long GroupOptionId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; } = 0;
        public bool IsDefault { get; set; } = false;
    }
}
