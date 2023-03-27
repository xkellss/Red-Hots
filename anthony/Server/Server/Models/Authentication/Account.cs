using Newtonsoft.Json;
using Server.Models.Authentication;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SalernoServer.Models.Authentication
{
    public class Account
    {
        public long AccountId { get; set; }
        public Employee Employee { get; set; }
        public string Password { get; set; } = ""; 
        public string RefreshToken { get; set; } = "";
    }
}
