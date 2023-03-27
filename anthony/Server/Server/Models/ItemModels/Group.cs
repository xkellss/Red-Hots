using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class Group
    {
        public long GroupId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<GroupOption> GroupOptions { get; set; } = new();
        [JsonIgnore]
        public Modifier Modifier { get; set; }
    }
}
