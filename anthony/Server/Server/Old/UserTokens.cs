namespace SalernoServer
{
    public class UserTokens
    {
        public string Token
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public TimeSpan Validaty
        {
            get;
            set;
        }
        public string RefreshToken
        {
            get;
            set;
        }
        public long Id
        {
            get;
            set;
        }
        public long GuidId
        {
            get;
            set;
        }
        public DateTime ExpiredTime
        {
            get;
            set;
        }
    }
}
