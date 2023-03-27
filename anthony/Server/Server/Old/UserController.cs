//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using SalernoServer.Models.Authentication;
//using System.Security.Cryptography;

//namespace SalernoServer
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly IUserService _userService;
//        public UserController(IUserService userService)
//        {
//            _userService = userService;
//        }
//        [HttpPost("register")]
//        public async Task<ActionResult> RegisterAsync(RegisterModel model)
//        {
//            var result = await _userService.RegisterAsync(model);
//            return Ok(result);
//        }
//        [HttpPost("token")]
//        public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
//        {
//            var result = await _userService.GetTokenAsync(model);
//            Console.WriteLine("RESULT => {0}", result.Token);
//            SetRefreshTokenInCookie(result.Token);
//            return Ok(result);
//        }
//        [HttpPost("refresh-token")]
//        public async Task<IActionResult> RefreshToken()
//        {
//            var refreshToken = Request.Cookies["refreshToken"];
//            var response = await _userService.RefreshTokenAsync(refreshToken);
//            if (string.IsNullOrEmpty(response.RefreshToken))
//                // SetRefreshTokenInCookie("bad");
//                return Forbid();
//            return Ok(response);
//        }
//        [Authorize]
//        [HttpPost("tokens/{id}")]
//        public IActionResult GetRefreshTokens(string id)
//        {
//            var account = _userService.GetById(id);
//            return Ok(account.RefreshTokens);
//        }

//        private void SetRefreshTokenInCookie(string refreshToken)
//        {
//            Console.WriteLine("COOKIE TOKEN VALUE => {0}", refreshToken);
//            var cookieOptions = new CookieOptions
//            {
//                HttpOnly = true,
//                Expires = DateTime.UtcNow.AddMinutes(1),
//            };
//            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
//        }
//    }
//}
