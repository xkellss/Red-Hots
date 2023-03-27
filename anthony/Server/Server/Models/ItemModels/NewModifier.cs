namespace Server.Models.ItemModels
{
    public class NewModifier
    {
        public long NewModifierId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Required { get; set; }
        public int? Minimum { get; set; }
        public int? Maximum { get; set; }
        public List<Option> Options { get; set; }
    }
}
