using System.ComponentModel.DataAnnotations;

namespace SalernoServer.Models.Authentication
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
