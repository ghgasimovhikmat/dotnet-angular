using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using API.DTOs;
using AutoMapper;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationIdentityDbContext _context;
        private readonly ITokenGenerationService _tokenGenerationService;

        private readonly IMapper _mapper;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationIdentityDbContext context, IMapper mapper, ITokenGenerationService tokenGenerationService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _mapper = mapper;
            _tokenGenerationService = tokenGenerationService;
        }

      
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var user = _mapper.Map<ApplicationUser>(model);
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok("User registered successfully.");
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                var token = _tokenGenerationService.GenerateToken(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                      new Claim(ClaimTypes.Name,user.DisplayName),
                    new Claim(ClaimTypes.Email,user.Email)
                    // Add additional claims if needed
                });

                // Generate token
                return Ok(
                    new {
                        message = "User logged in successfully.", 
                        Token=token 
                    });
            }
            return BadRequest("Invalid login attempt.");
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("User logged out successfully.");
        }

    
        [HttpPost("address")]
        [Authorize]
        public async Task<IActionResult> UpdateUserAddress(AddressDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Update user's address
            _mapper.Map(model, user.Address);

            _context.Update(user); // Update user entity in the context
            await _context.SaveChangesAsync(); // Save changes to the database

            return Ok("User address updated successfully.");
        }

        [HttpGet("checkemail")]
        public async Task<IActionResult> CheckEmailExists(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return Ok("Email already exists.");
            }
            return NotFound("Email does not exist.");
        }
    }

 
}
