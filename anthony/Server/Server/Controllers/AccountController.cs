//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Internal;
//using Microsoft.IdentityModel.Tokens;
//using SalernoServer.JwtHelpers;
//using SalernoServer.Models;
//using SalernoServer.Models;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Principal;
//using System.ServiceModel.Security.Tokens;
//using System.Text;
//using System.Text.Json.Nodes;
//using SalernoServer.Models.Authentication;

//namespace SalernoServer.Controllers
//{
//    [Route("api/account")]
//    [ApiController]
//    public class AccountController : ControllerBase
//    {
//        private readonly JwtSettings jwtSettings;
//        private readonly AppDbContext _context;
//        public AccountController(JwtSettings jwtSettings, AppDbContext context)
//        {
//            this.jwtSettings = jwtSettings;
//            _context = context;
//        }
//        [HttpPost]
//        [Route("login")]
//        public async Task<IActionResult> Login([FromBody] AccountLogin accountLogin)
//        {
//            try
//            {
//                var foundCustomerAccount = await _context.CustomerAccounts.Where(a => a.Email.Equals(accountLogin.Email, StringComparison.OrdinalIgnoreCase)).FirstOrDefaultAsync();
//                if (foundCustomerAccount is null) return NotFound();
//                if (!foundCustomerAccount.Password.Equals(accountLogin.Password)) return BadRequest("Invalid password");

//                var RefreshToken = JwtHelpers.JwtHelpers.GetRefreshToken(new UserTokens()
//                {
//                    Email = foundCustomerAccount.Email,
//                    GuidId = 123,
//                    Id = foundCustomerAccount.CustomerAccountId,
//                }, jwtSettings);
//                Console.WriteLine("Refresh token => {0}", RefreshToken.Token);

//                foundAccount.RefreshToken = RefreshToken.Token;
//                await _context.SaveChangesAsync();

//                var cookieOptions = new CookieOptions
//                {
//                    HttpOnly = true,
//                    Expires = DateTime.UtcNow.AddMinutes(1)
//                };
//                Response.Cookies.Append("refreshToken", RefreshToken.Token, cookieOptions);
//                return Ok(RefreshToken);
//            }
//            catch (Exception ex)
//            {
//                throw;
//            }
//        }
//        [HttpGet]
//        [Route("refresh")]
//        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
//        public async Task<IActionResult> GetAccessToken()
//        {
//            // https://stackoverflow.com/questions/50204844/how-to-validate-a-jwt-token
//            try
//            {
//                var cookie = Request.Cookies["refreshtoken"];
//                var tokenHandler = new JwtSecurityTokenHandler();
//                Console.WriteLine("Cookie Value => {0}", cookie);
//                // https://stackoverflow.com/questions/43045035/jwt-token-authentication-expired-tokens-still-working-net-core-web-api
//                var validationParameters = new TokenValidationParameters
//                {
//                    ValidateAudience = false,
//                    ValidAudience = "https://localhost:7074",
//                    ValidateIssuer = false,
//                    ValidIssuer = "https://localhost:7074",
//                    ValidateLifetime = true,
//                    ClockSkew = TimeSpan.Zero,
//                    ValidateIssuerSigningKey = true,
//                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.IssuerSigningKey))
//                };
//                Console.WriteLine("refresh2");
//                //SecurityKey validatedToken;
//                // https://stackoverflow.com/a/66980339s
//                IPrincipal principal = tokenHandler.ValidateToken(cookie, validationParameters, out var validatedToken);
//                if (validatedToken is JwtSecurityToken jwtSecurityToken)
//                {
//                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
//                    Console.WriteLine("tokens.-0-------0-0-0-0--0-0-0--0");
//                    Console.WriteLine("Claims:");
//                    foreach (var claim in jwtSecurityToken.Claims)
//                    {
//                        Console.WriteLine(claim.ToString());
//                    }
//                }
//                var cookieOptions = new CookieOptions
//                {
//                    HttpOnly = true,
//                    Expires = DateTime.UtcNow.AddMinutes(1)
//                };
//                Response.Cookies.Append("refreshtoken", cookie, cookieOptions);
//                return Ok(cookie);
//            }
//            catch (Exception ex)
//            {
//                return Forbid(ex.Message);
//            }
//        }
//        [HttpPost]
//        [Route("register")]
//        public async Task<IActionResult> Register([FromBody] Account account)
//        {
//            try
//            {
//                var foundAccount = await _context.Accounts.Where(a => a.Email == account.Email).FirstOrDefaultAsync();
//                if (foundAccount != null) return BadRequest(string.Format("Account with email: {0} already exists!", account.Email));
//                _context.Accounts.Add(account);

//                await _context.SaveChangesAsync();
//                return Ok("Account registered!");
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }
//                /// <summary>
//                /// Get List of UserAccounts
//                /// </summary>
//                /// <returns>List Of UserAccounts</returns>
//                [HttpGet]
//        public IActionResult GetList()
//        {
//            return Ok();
//        }
//    }
//}