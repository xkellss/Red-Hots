using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class Addon
    {
        public long AddonId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        [JsonIgnore]
        public Modifier Modifier { get; set; }
    }
}
