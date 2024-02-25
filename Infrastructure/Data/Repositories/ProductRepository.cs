using Core.Entities;
using Core.Interfaces;
using Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly EcommerceContext _context;
        public ProductRepository(EcommerceContext context) 
        {
            _context = context;
        }
        public async Task<IList<Product>> GetProductsAsync()
        {
            // Fetch all products from the database including related ProductBrand and ProductType
            return await _context.Products
                .Include(p => p.ProductBrand) // Include ProductBrand navigation property
                .Include(p => p.ProductType)  // Include ProductType navigation property
                .ToListAsync();
        }

        public async Task<IList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<IList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            // Fetch a product by its ID from the database including related ProductBrand and ProductType
            return await _context.Products
                .Include(p => p.ProductBrand) // Include ProductBrand navigation property
                .Include(p => p.ProductType)  // Include ProductType navigation property
                .FirstOrDefaultAsync(p => p.Id == id)

            // If the product is null, throw a NotFoundException
            ?? throw new NotFoundException($"Product with ID {id} not found");
        }
    }
}
