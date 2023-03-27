using SalernoServer.Models;

namespace Server.Models
{
    public class OrderCustomerAccountDTO
    {
        public long CustomerAccountId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
