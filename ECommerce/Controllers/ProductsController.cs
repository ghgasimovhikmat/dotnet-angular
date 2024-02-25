using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Infrastructure.Data.Specifications;
using API.DTOs;
using AutoMapper;
using API.Helpers.API.Helpers;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        /// <summary>
        /// private readonly IProductRepository _repo; // Inject the ECommerceContext
        /// </summary>
        private readonly IRepository<ProductType> _productTypeRepository;
        private readonly IRepository<ProductBrand> _productBrandRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;
        public ProductsController(
            IRepository<ProductType> productTypeRepository,
            IRepository<ProductBrand> productBrandRepository,
            IRepository<Product> productRepository,
            IMapper mapper)
        {
            _productTypeRepository = productTypeRepository;
            _productBrandRepository = productBrandRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }


        //GET: api/v1/Products
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<ProductDTO>>> GetProducts([FromQuery] ProductParams productParams)
        {
            try
            {
               
                var sort = productParams.Sort;
                var productTypeId = productParams.ProductTypeId;
                var productBrandId = productParams.ProductBrandId;
                var skip = (productParams.PageIndex - 1) * productParams.PageSize; // Calculate skip based on PageIndex and PageSize
                var take = productParams.PageSize; // Use PageSize for take
                var search = productParams.Search;

                // Create a specification for counting products
                var countSpec = new ProductCountSpecification(productTypeId, productBrandId, search);
                // Use the specification with the repository to get the total count of products
                var totalCount = await _productRepository.CountAsync(countSpec);
                // If totalCount is 0, return an empty result immediately
                if (totalCount == 0)
                {
                    return Ok(new Pagination<ProductDTO>(productParams.PageIndex, productParams.PageSize, 0, new List<ProductDTO>()));
                }

                // Create a specification for fetching paginated products
                var spec = new ProductsWithTypesAndBrandSpecification(sort, productTypeId, productBrandId, skip, take, search);

                // Use the specification with the repository to get filtered and included results
                var products = await _productRepository.ListAsync(spec);

                var productDTOs = _mapper.Map<List<ProductDTO>>(products);

                // Create a Pagination object to return both product data and total count
                var pagination = new Pagination<ProductDTO>(productParams.PageIndex, productParams.PageSize, totalCount, productDTOs);

                return Ok(pagination);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
           


        }

        //   [HttpGet]
        //   public async Task<ActionResult<Pagination<ProductDTO>>> GetPaginatedProducts([FromQuery] ProductParams productParams)
        //   {

        //       var sort = productParams.Sort;
        //       var productTypeId = productParams.ProductTypeId;
        //       var productBrandId = productParams.ProductBrandId;
        //       var skip = (productParams.PageIndex - 1) * productParams.PageSize;
        //       var take = productParams.PageSize;
        //       var search = productParams.Search;



        //       var countSpec = new ProductCountSpecification(productTypeId, productBrandId, search);


        //       var totalItems = await _productRepository.CountAsync(countSpec);

        //       var spec = new ProductsWithTypesAndBrandSpecification(
        //           sort,
        //           productTypeId,
        //           productBrandId,
        //           skip,
        //           take,
        //           search);

        //       var products = await _productRepository.ListAsync(spec);

        //       // Change the type of productDto to IReadOnlyList<Product>
        //       var productDto = _mapper.Map<IReadOnlyList<ProductDTO>>(products);

        //       var pagination = new Pagination<ProductDTO>(
        //productParams.PageIndex,
        //productParams.PageSize,
        //totalItems,
        //productDto);

        //       return Ok(pagination);
        //   }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandSpecification(id);

            var retrievedProduct = await _productRepository.GetProductByIdAsync(spec); // Fetch a product by its ID from the database

            var product = _mapper.Map<ProductDTO>(retrievedProduct);
            return Ok(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IEnumerable<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepository.GetProductBrandsAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepository.GetProductTypesAsync());
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string sort = "NameAsc")
        //{
        //    var spec = new ProductsWithTypesAndBrandSpecification(sort);

        //    var products = await _productRepository.ListAsync(spec);
        //    // var products = await _productRepository.GetProductsAsync(p=>p.ProductType,p=>p.ProductBrand); // Fetch all products from the database
        //    var productDto = _mapper.Map<IList<ProductDTO>>(products);

        //    return Ok(productDto);
        //}
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        //    string sort = "NameAsc",
        //    int? productTypeId = null,
        //    int? productBrandId = null,
        //    int skip = 0,
        //    int take = 10,
        //    string search = "")
        //{
        //    var spec = new ProductsWithTypesAndBrandSpecification(sort, productTypeId, productBrandId, skip, take, search);

        //    var products = await _productRepository.ListAsync(spec);
        //    var productDto = _mapper.Map<IList<ProductDTO>>(products);

        //    return Ok(productDto);
        //}
        //    [HttpGet]
        //    public async Task<ActionResult<Pagination<Product>>> GetPaginatedProducts(
        //string sort = "NameAsc",
        //int? productTypeId = null,
        //int? productBrandId = null,
        //int pageIndex = 1, // Default to page 1
        //int pageSize = 10,
        //string search = "")
        //    {
        //        var countSpec = new ProductCountSpecification(productTypeId, productBrandId, search);
        //        var totalItems = await _productRepository.CountAsync(countSpec);

        //        var spec = new ProductsWithTypesAndBrandSpecification(sort, productTypeId, productBrandId, pageIndex, pageSize, search);

        //        var products = await _productRepository.ListAsync(spec);

        //        // Change the type of productDto to IReadOnlyList<Product>
        //        var productDto = _mapper.Map<IReadOnlyList<Product>>(products);

        //        var pagination = new Pagination<Product>(pageIndex, pageSize, totalItems, productDto);

        //        return Ok(pagination);
        //    }


        /* [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandSpecification(id);
            var product = await _productRepository.GetProductByIdAsync(id, p => p.ProductType, p => p.ProductBrand); // Fetch a product by its ID from the database


            return Ok(product);
        }*/
        //[HttpPost]
        //public async Task<ActionResult<Product>> Post([FromBody] Product product)
        //{
        //    _context.Products.Add(product); // Add the product to the context
        //    await _context.SaveChangesAsync(); // Save changes to the database
        //    return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, [FromBody] Product updatedProduct)
        //{
        //    if (id != updatedProduct.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(updatedProduct).State = EntityState.Modified; // Mark the product as modified
        //    await _context.SaveChangesAsync(); // Save changes to the database
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var product = await _context.Products.FindAsync(id); // Fetch the product to delete

        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Products.Remove(product); // Remove the product from the context
        //    await _context.SaveChangesAsync(); // Save changes to the database
        //    return NoContent();
        //}
    }

}