using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.ItemModels
{
    public class ModifierHelper
    {
        public long ModifierId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public string ItemId { get; set; }
        public List<ModifierGroupHelper> Groups { get; set; } = new();
        public List<ModifierAddonHelper> Addons { get; set; } = new();
        public List<ModifierNoOptionHelper> NoOptions { get; set; } = new();
    }
}
