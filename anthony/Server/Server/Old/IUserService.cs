using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SalernoServer.Models.Authentication;
using System.IdentityModel.Tokens.Jwt;

namespace SalernoServer
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<AuthenticationModel> RefreshTokenAsync(string token);
        Account GetById(string id);
        bool RevokeToken(string token);
    }
}
