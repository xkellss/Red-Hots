//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
//using SalernoServer.Models;
//using SalernoServer.Models.Authentication;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Security.Cryptography;
//using System.Text;

//namespace SalernoServer
//{
//    public class UserService : IUserService
//    {
//        private readonly JWT _jwt;
//        private readonly AppDbContext _context;
//        public UserService(IOptions<JWT> jwt, AppDbContext context)
//        {
//            _jwt = jwt.Value;
//            _context = context;
//        }
//        public async Task<string> RegisterAsync(RegisterModel model)
//        {
//            if (_context.Accounts.Any(a => a.Email== model.Email))
//            {
//                return $"Email {model.Email} is already registered!";
//            }
//            try
//            {
//                var account = new Account
//                {
//                    UserName = model.Username,
//                    Password = model.Password,
//                    Email = model.Email,
//                    FirstName = model.FirstName,
//                    LastName = model.LastName
//                };
//                await _context.Accounts.AddAsync(account);
//                await _context.SaveChangesAsync();
//                return $"Account registered!";
//            }
//            catch (Exception ex)
//            {
//                return ex.Message;
//            }

//            /*var user = new ApplicationUser
//            {
//                UserName = model.Username,
//                Email = model.Email,
//                FirstName = model.FirstName,
//                LastName = model.LastName
//            };
//            var userWithSameEmail = await _userManager.FindByEmailAsync(model.Email);
//            if (userWithSameEmail == null)
//            {
//                var result = await _userManager.CreateAsync(user, model.Password);
//                if (result.Succeeded)
//                {
//                    await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());

//                }
//                return $"User Registered with username {user.UserName}";
//            }
//            else
//            {
//                return $"Email {user.Email} is already registered.";
//            }*/
//        }
//        public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model)
//        {
//            Console.WriteLine("EMAIL => {0}", model.Email);
//            var authenticationModel = new AuthenticationModel();
//            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == model.Email);
//            if (account == null)
//            {
//                Console.WriteLine("Cannot find account");
//                authenticationModel.IsAuthenticated= false;
//                authenticationModel.Message = $"No Accounts Registered with {model.Email}.";
//                return authenticationModel;
//            }
            
//            if (account.Password == model.Password)
//            {
//                Console.WriteLine("Password is good");
//                authenticationModel.IsAuthenticated = true;
//                JwtSecurityToken jwtSecurityToken = await CreateJwtToken(account);
//                authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
//                authenticationModel.Email = account.Email;
//                authenticationModel.UserName = account.UserName;
//                Console.WriteLine("Returning valid auth model");

//                if (account.RefreshTokens.Any(a => a.IsActive))
//                {
//                    var activeRefreshToken = account.RefreshTokens.Where(a => a.IsActive == true).ToList();
//                    activeRefreshToken.ForEach(token =>
//                    {
//                        Console.WriteLine("Checking token id => {0}", token.Token);
//                        if (token.Expires < DateTime.UtcNow)
//                            token.Revoked = DateTime.UtcNow;
//                    });
//                    //authenticationModel.RefreshToken = activeRefreshToken.Token;
//                    //authenticationModel.RefreshTokenExpiration = activeRefreshToken.Expires;
//                }
//                else
//                {
//                    var refreshToken = CreateRefreshToken();
//                    authenticationModel.RefreshToken = refreshToken.Token;
//                    authenticationModel.RefreshTokenExpiration = refreshToken.Expires;
//                    account.RefreshTokens.Add(refreshToken);
//                    _context.Update(account);
//                    _context.SaveChanges();
//                }
//                return authenticationModel;
//            }
//            Console.WriteLine("Password wasnt good");
//            authenticationModel.IsAuthenticated = false;
//            authenticationModel.Message = $"Incorrect Credentials for user {account.Email}.";
//            return authenticationModel;
//            /*var authenticationModel = new AuthenticationModel();
//              var user = await _userManager.FindByEmailAsync(model.Email);
//              if (user == null)
//              {
//                  authenticationModel.IsAuthenticated = false;
//                  authenticationModel.Message = $"No Accounts Registered with {model.Email}.";
//                  return authenticationModel;
//              }
//              if (await _userManager.CheckPasswordAsync(user, model.Password))
//              {
//                  authenticationModel.IsAuthenticated = true;
//                  JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
//                  authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
//                  authenticationModel.Email = user.Email;
//                  authenticationModel.UserName = user.UserName;
//                  var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
//                  authenticationModel.Roles = rolesList.ToList();
//                  return authenticationModel;
//              }
//              authenticationModel.IsAuthenticated = false;
//              authenticationModel.Message = $"Incorrect Credentials for user {user.Email}.";
//              return authenticationModel;*/
//        }
//        private async Task<JwtSecurityToken> CreateJwtToken(Account account)
//        {
//            var claims = new[]
//            {
//                new Claim(JwtRegisteredClaimNames.Sub, account.UserName),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim(JwtRegisteredClaimNames.Email, account.Email),
//                new Claim(ClaimTypes.Expiration, DateTime.UtcNow.AddSeconds(10).ToString("MMM ddd dd yyyy HH:mm:ss tt"))
//            };
//            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
//            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

//            var jwtSecurityToken = new JwtSecurityToken(
//                issuer: _jwt.Issuer,
//                audience: _jwt.Audience,
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(1),
//                signingCredentials: signingCredentials);
//            return jwtSecurityToken;

//            /*var userClaims = await _userManager.GetClaimsAsync(user);
//            var roles = await _userManager.GetRolesAsync(user);

//            var roleClaims = new List<Claim>();

//            for (int i = 0; i < roles.Count; i++)
//            {
//                roleClaims.Add(new Claim("roles", roles[i]));
//            }

//            var claims = new[]
//            {
//                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim(JwtRegisteredClaimNames.Email, user.Email),
//                new Claim("uid", user.Id)
//            }
//            .Union(userClaims)
//            .Union(roleClaims);

//            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
//            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

//            var jwtSecurityToken = new JwtSecurityToken(
//                issuer: _jwt.Issuer,
//                audience: _jwt.Audience,
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
//                signingCredentials: signingCredentials);
//            return jwtSecurityToken;*/
//        }
//        public Account GetById(string id)
//        {
//            return _context.Accounts.Find(id);
//        }
//        public bool RevokeToken(string token)
//        {
//            var account = _context.Accounts.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

//            // return false if no user found with token
//            if (account == null) return false;

//            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

//            // return false if token is not active
//            if (!refreshToken.IsActive) return false;

//            // revoke token and save
//            refreshToken.Revoked = DateTime.UtcNow;
//            _context.Update(account);
//            _context.SaveChanges();

//            return true;
//            /*var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

//            // return false if no user found with token
//            if (user == null) return false;

//            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

//            // return false if token is not active
//            if (!refreshToken.IsActive) return false;

//            // revoke token and save
//            refreshToken.Revoked = DateTime.UtcNow;
//            _context.Update(user);
//            _context.SaveChanges();

//            return true;*/
//        }

//        private static RefreshToken CreateRefreshToken()
//        {
//            var randomNumber = new byte[32];
//            using (var generator = new RNGCryptoServiceProvider())
//            {
//                generator.GetBytes(randomNumber);
//                return new RefreshToken
//                {
//                    Token = Convert.ToBase64String(randomNumber),
//                    Expires = DateTime.UtcNow.AddMinutes(1),
//                    Created = DateTime.UtcNow
//                };
//            }
//        }
//        public async Task<AuthenticationModel> RefreshTokenAsync(string token)
//        {
//            var authenticationModel = new AuthenticationModel();
//            var account = await _context.Accounts.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));
//            if (account == null)
//            {
//                authenticationModel.IsAuthenticated = false;
//                authenticationModel.Message = $"Token did not match any users.";
//                return authenticationModel;
//            }
//            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

//            if (!refreshToken.IsActive)
//            {
//                authenticationModel.IsAuthenticated = false;
//                authenticationModel.Message = $"Token not active.";
//                return authenticationModel;
//            }

//            //Revoke Current Refresh Token
//            refreshToken.Revoked = DateTime.UtcNow;

//            //Generate new Refresh Token and save to Database
//            var newRefreshToken = CreateRefreshToken();
//            account.RefreshTokens.Add(newRefreshToken);
//            _context.Update(account);
//            await _context.SaveChangesAsync();

//            Console.WriteLine("NEW REFRESH TOKEN => {0}", newRefreshToken.Token);
//            //Generates new jwt
//            authenticationModel.IsAuthenticated = true;
//            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(account);
//            authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
//            authenticationModel.Email = account.Email;
//            authenticationModel.UserName = account.UserName;
//            authenticationModel.RefreshToken = newRefreshToken.Token;
//            authenticationModel.RefreshTokenExpiration = newRefreshToken.Expires;
//            return authenticationModel;
///*
//            var authenticationModel = new AuthenticationModel();
//            var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
//            if (user == null)
//            {
//                authenticationModel.IsAuthenticated = false;
//                authenticationModel.Message = $"Token did not match any users.";
//                return authenticationModel;
//            }

//            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

//            if (!refreshToken.IsActive)
//            {
//                authenticationModel.IsAuthenticated = false;
//                authenticationModel.Message = $"Token Not Active.";
//                return authenticationModel;
//            }

//            //Revoke Current Refresh Token
//            refreshToken.Revoked = DateTime.UtcNow;

//            //Generate new Refresh Token and save to Database
//            var newRefreshToken = CreateRefreshToken();
//            user.RefreshTokens.Add(newRefreshToken);
//            _context.Update(user);
//            _context.SaveChanges();

//            //Generates new jwt
//            authenticationModel.IsAuthenticated = true;
//            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
//            authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
//            authenticationModel.Email = user.Email;
//            authenticationModel.UserName = user.UserName;
//            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
//            authenticationModel.Roles = rolesList.ToList();
//            authenticationModel.RefreshToken = newRefreshToken.Token;
//            authenticationModel.RefreshTokenExpiration = newRefreshToken.Expires;
//            return authenticationModel;*/
//        }
//    }
//}
