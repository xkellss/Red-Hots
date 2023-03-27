using SalernoServer.Models.Authentication;
using SalernoServer.Models;
using System.Text.Json.Serialization;

namespace Server.Models.Authentication
{
    public class CustomerAccount
    {
        public long CustomerAccountId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string RefreshToken { get; set; } = "";
        [JsonIgnore]
        public List<Order> Orders { get; set; }
    }
}
