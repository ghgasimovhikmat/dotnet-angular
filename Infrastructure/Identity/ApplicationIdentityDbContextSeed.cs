using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public static class ApplicationIdentityDbContextSeed
    {
        public static class AppIdentityDbContextSeed
        {
            public static async Task SeedAsync(IServiceProvider services)
            {
                // Using a service scope to get the UserManager and DbContext
                using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationIdentityDbContext>();

                    await SeedUsersAsync(userManager, dbContext);
                    // Add other seed methods here
                }
            }

            private static async Task SeedUsersAsync(UserManager<ApplicationUser> userManager, ApplicationIdentityDbContext dbContext)
            {
                if (!userManager.Users.Any())
                {
                    var user = new ApplicationUser
                    {
                        UserName = "hugo@example.com",
                        Email = "hugo@example.com",
                        DisplayName = "Hugo Kasanov",
                        EmailConfirmed = true,
                        Address = new Address
                        {
                            Id = Guid.NewGuid().ToString(),
                            Fname = "Hugo",
                            Lname = "Kasanov",
                            Street = "123 Main St",
                            City = "Riga",
                            ZipCode = "1019"
                        }
                    };

                    var result = await userManager.CreateAsync(user, "Pa$$word@1");

                    if (!result.Succeeded)
                    {
                        throw new Exception("Failed to create default user");
                    }
                }
            }
        }
    }
}
