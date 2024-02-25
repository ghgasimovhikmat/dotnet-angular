namespace Core.Entities;


public class Product : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; } // New property for the picture URL

    // Foreign key properties
    public int ProductTypeId { get; set; }
    public int ProductBrandId { get; set; }

    // Navigation properties
    public ProductBrand ProductBrand { get; set; }
    public ProductType ProductType { get; set; }
}
