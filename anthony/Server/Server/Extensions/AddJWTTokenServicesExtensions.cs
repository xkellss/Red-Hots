using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SalernoServer.Models.Authentication;

namespace SalernoServer.Extensions
{
    public static class AddJWTTokenServicesExtensions
    {
        // https://www.c-sharpcorner.com/article/jwt-token-authentication-and-authorizations-in-net-core-6-0-web-api/
        public static void AddJWTTokenServices(this IServiceCollection Services, IConfiguration Configuration)
        {
            // Add Jwt Setings
            var bindJwtSettings = new JwtSettings();
            Configuration.Bind("JSONWebToken", bindJwtSettings);
            Services.AddSingleton(bindJwtSettings);
            Services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = bindJwtSettings.ValidateIssuerSigningKey,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(bindJwtSettings.IssuerSigningKey)),
                    ValidateIssuer = bindJwtSettings.ValidateIssuer,
                    ValidIssuer = bindJwtSettings.ValidIssuer,
                    ValidateAudience = bindJwtSettings.ValidateAudience,
                    ValidAudience = bindJwtSettings.ValidAudience,
                    RequireExpirationTime = bindJwtSettings.RequireExpirationTime,
                    ValidateLifetime = bindJwtSettings.RequireExpirationTime,
                    ClockSkew = TimeSpan.Zero,
                };
            });
        }
    }
}