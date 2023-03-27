using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SalernoServer.Models;
using SalernoServer.Models.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Server.Models.Authentication;
using Microsoft.EntityFrameworkCore;

namespace SalernoServer
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthenticateController(
            AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginCustomerAccount([FromBody] LoginModel loginModel)
        {
            var customerAccount = _context.CustomerAccounts.Where(a => a.Email.Equals(loginModel.Email)).FirstOrDefault();
            if (customerAccount is not null && customerAccount.Password.Equals(loginModel.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim("Email", customerAccount.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var accessToken = CreateAccessToken(authClaims);
                var refreshToken = CreateRefreshToken(authClaims);

                var refTokString = new JwtSecurityTokenHandler().WriteToken(refreshToken);
                customerAccount.RefreshToken = refTokString;

                _context.Update(customerAccount);
                await _context.SaveChangesAsync();

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddHours(1)
                };
                Response.Cookies.Append("RefreshToken", refTokString, cookieOptions);
                return Ok(new
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
                    email = customerAccount.Email,
                    firstName = customerAccount.FirstName,
                    lastName = customerAccount.LastName
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var customerAccountExists = _context.CustomerAccounts.Where(ca => ca.Email.Equals(registerModel.Email)).Any();
            if (customerAccountExists) return StatusCode(500);
            CustomerAccount customerAccount = new()
            {
                Email = registerModel.Email,
                FirstName = registerModel.FirstName,
                LastName = registerModel.LastName,
                Password = registerModel.Password,
                PhoneNumber = registerModel.PhoneNumber
            };
            var result = await _context.CustomerAccounts.AddAsync(customerAccount);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["RefreshToken"];
            var foundAccount = await _context.CustomerAccounts.Where(ca => ca.RefreshToken.Equals(refreshToken)).FirstOrDefaultAsync();
            if (foundAccount is null) return BadRequest("Can't find account");
            foundAccount.RefreshToken = "";
            _context.Update(foundAccount);
            return Ok();
        }
        [HttpGet]
        [Route("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            string? refreshToken = Request.Cookies["RefreshToken"];
            if (string.IsNullOrEmpty(refreshToken)) return StatusCode(403);
            Console.WriteLine(refreshToken);
            
            var principal = ValidateToken(refreshToken);
            if (principal is null)
            {
                return BadRequest("Invalid token");
            }
            string emailFromClaim = principal.Claims.Where(c => c.Type.Equals("Email")).FirstOrDefault().Value;
            if (emailFromClaim is null) return BadRequest("Bad email");
            Console.WriteLine(emailFromClaim);
            var customerAccount = _context.CustomerAccounts.Where(a => a.Email.Equals(emailFromClaim)).FirstOrDefault();
            if (customerAccount is null)
                return BadRequest("Invalid token account!");
            Console.WriteLine(DateTime.UtcNow.TimeOfDay.Ticks + " - " + principal.Claims.Where(c => c.Type.Equals("exp")).FirstOrDefault().Value);
            var tokenDate = DateTimeOffset.FromUnixTimeSeconds(long.Parse(principal.Claims.Where(c => c.Type.Equals("exp")).FirstOrDefault().Value)).UtcDateTime;
            var now = DateTime.UtcNow.ToUniversalTime();

            var valid = tokenDate >= now;

            Console.WriteLine($"Token Date => {tokenDate}, Current Date => {now}");
            if (!valid)
            {
                customerAccount.RefreshToken = "";
                Response.Cookies.Delete("refreshtoken");
                return StatusCode(403);
            }
            if (!customerAccount.RefreshToken.Equals(refreshToken))
            {
                customerAccount.RefreshToken = "";
                return BadRequest("Token does not match DB");
            }

            var authClaims = new List<Claim>
                {
                    new Claim("Email", customerAccount.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var token = CreateAccessToken(authClaims);
            
            var tok = new JwtSecurityTokenHandler().WriteToken(token);
            
            await _context.SaveChangesAsync();

            return Ok(new
            {
                AccessToken = tok
            });
        }
        private static JwtSecurityToken CreateAccessToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "393db6f97fa5f393e04a0d687a6963d843bfed13189aa397398084a8056e881656be9a7448d923d75eef7e19087145da577dc03c3c9c6a8e32884a6e5fa7bc1"
            ));

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7074",
                audience: "https://localhost:7074",
                expires: DateTime.UtcNow.AddMinutes(15),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
        private static JwtSecurityToken CreateRefreshToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "e7202338bf9a0384046b2753776c5fa9cc7e095dc0df1e63c8f95bbb0df31a7bc9a3732b13bfe0ecd2c4f9ce5abaaba7be85860f9dc2a25c453ec3aab6be157f"
            ));

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7074",
                audience: "https://localhost:7074",
                expires: DateTime.UtcNow.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                ); ;

            return token;
        }

        private static ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        "e7202338bf9a0384046b2753776c5fa9cc7e095dc0df1e63c8f95bbb0df31a7bc9a3732b13bfe0ecd2c4f9ce5abaaba7be85860f9dc2a25c453ec3aab6be157f"
                    )),
                    ValidateLifetime = true
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }
            catch (Microsoft.IdentityModel.Tokens.SecurityTokenExpiredException ex)
            {
                Console.WriteLine("Yeah");
                return null;
            }
        }
    }
}