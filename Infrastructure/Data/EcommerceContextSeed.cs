using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
// Replace with your actual namespace and models

namespace Infrastructure.Data
{
    public  class EcommerceContextSeed
    {
        private readonly ILogger<EcommerceContextSeed> _logger;
        public EcommerceContextSeed(ILogger<EcommerceContextSeed> logger)
        {
            _logger = logger;
        }
        public  async Task SeedDataAsync(EcommerceContext context)
        {
            using var transaction = context.Database.BeginTransaction();
            try
            {
               // var logger = loggerFactory.CreateLogger<EcommerceContextSeed>();

                if (!await context.ProductBrands.AnyAsync() &&
                    !await context.ProductTypes.AnyAsync() &&
                    !await context.Products.AnyAsync())
                {
                    await SeedBrandsAsync(context);
                    await SeedTypesAsync(context);
                    await SeedProductsAsync(context);

                    transaction.Commit();

                
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                _logger.LogError(ex,"error occured while seeding the database");
              
                throw;
            }
        }

        private  async Task SeedBrandsAsync(EcommerceContext context)
        {
            try
            {
                var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                await context.ProductBrands.AddRangeAsync(brands);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex, "seeding brands");
                throw;
            }
        }

        private  async Task SeedTypesAsync(EcommerceContext context)
        {
            try
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                await context.ProductTypes.AddRangeAsync(types);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex, "seeding types");
                throw;
            }
        }

        private  async Task SeedProductsAsync(EcommerceContext context)
        {
            try
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex, "seeding products");
                throw;
            }
        }

    }
}
