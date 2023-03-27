//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using SalernoServer.Models;
//using System.Text;

//namespace SalernoServer
//{
//    public static class AddJWTAuthenticationServicesExtensions
//    {
//        public static void AddNewJWTTokenServices(this IServiceCollection Services, IConfiguration Configuration)
//        {
//            //Configuration from AppSettings
//            Services.Configure<JWT>(Configuration.GetSection("JWT"));
//            //User Manager Service
//            Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
//            Services.AddScoped<IUserService, UserService>();
//            //Adding Athentication - JWT
//            Services.AddAuthentication(options =>
//            {
//                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//            })

//                .AddJwtBearer(options =>
//                {
//                    options.RequireHttpsMetadata = false;
//                    options.SaveToken = false;
//                    options.TokenValidationParameters = new TokenValidationParameters
//                    {
//                        ValidateIssuerSigningKey = true,
//                        ValidateIssuer = true,
//                        ValidateAudience = true,
//                        ValidateLifetime = true,
//                        ClockSkew = TimeSpan.Zero,

//                        ValidIssuer = Configuration["JWT:Issuer"],
//                        ValidAudience = Configuration["JWT:Audience"],
//                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))
//                    };
//                });
//        }
//    }
//}
