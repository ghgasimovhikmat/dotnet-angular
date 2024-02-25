using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class EcommerceContext : DbContext
    {

        public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity relationships and any other model customization here
            modelBuilder.Entity<Product>()
                 .HasOne(p => p.ProductBrand)
                 .WithMany()
                 .HasForeignKey(p => p.ProductBrandId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductType)
                .WithMany()
                .HasForeignKey(p => p.ProductTypeId);


            base.OnModelCreating(modelBuilder);



        }

    }
}
