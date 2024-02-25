using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Specifications
{
    public class ProductCountSpecification : BaseSpecification<Product>
    {
        public ProductCountSpecification(int? productTypeId, int? productBrandId, string search) : base(
                x =>
                    (string.IsNullOrEmpty(search) || x.Name.ToLower().Contains(search)) &&
                    (!productBrandId.HasValue || x.ProductBrandId == productBrandId.Value) &&
                    (!productTypeId.HasValue || x.ProductTypeId == productTypeId.Value)
            )
        {
            //ApplyCriteria(p => true); // Default criteria for counting

            //if (productTypeId.HasValue && productBrandId.HasValue)
            //{
            //    ApplyCriteria(p => p.ProductTypeId == productTypeId.Value && p.ProductBrandId == productBrandId.Value);
            //}
            //else
            //{
            //    if (productTypeId.HasValue)
            //    {
            //        ApplyCriteria(p => p.ProductTypeId == productTypeId.Value);
            //    }

            //    if (productBrandId.HasValue)
            //    {
            //        ApplyCriteria(p => p.ProductBrandId == productBrandId.Value);
            //    }
            //}

            //if (!string.IsNullOrEmpty(search))
            //{
            //    // Apply search criteria
            //    ApplyCriteria(p =>
            //        p.Name.ToLower().Contains(search.ToLower()));
            //}

        }
    }
}
