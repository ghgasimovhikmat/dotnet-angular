using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service
{
    public class TokenGenerationService : ITokenGenerationService
    {
        private readonly TokenConfigurations _tokenConfigurations;

        public TokenGenerationService(TokenConfigurations tokenConfigurations)
        {
            _tokenConfigurations = tokenConfigurations ?? throw new ArgumentNullException(nameof(tokenConfigurations));
        }

    
        public string GenerateToken(IEnumerable<Claim> claims, int expirationSeconds = 120)
        {
            if (string.IsNullOrEmpty(_tokenConfigurations.Key))
            {
                throw new InvalidOperationException("Token key is null or empty.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfigurations.Key));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _tokenConfigurations.Issuer,
                audience: _tokenConfigurations.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(expirationSeconds),
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
