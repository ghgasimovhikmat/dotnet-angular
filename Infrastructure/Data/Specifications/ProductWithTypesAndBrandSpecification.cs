using Core.Entities;
using Core.Enum;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Infrastructure.Data.Specifications
{
    public class ProductsWithTypesAndBrandSpecification : BaseSpecification<Product>
    {

        public ProductsWithTypesAndBrandSpecification(string sort, int? productTypeId, int? productBrandId,  int Skip , int Take,string search)
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
         //   ApplyCriteria(p => p.Price > 100); //Example custom criteria
            ApplyOrderBy(p => p.Name, Core.Enum.OrderBy.Ascending);// Example ordering by product name ascending

           
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort.ToLower())
                {
                    case "priceasc":
                        ApplyOrderBy(p => (double)p.Price, Core.Enum.OrderBy.Ascending);
                        break;
                    case "pricedesc":
                        ApplyOrderBy(p => (double)p.Price, Core.Enum.OrderBy.Descending);
                        break;
                    case "namedesc":
                        ApplyOrderBy(p => p.Name, Core.Enum.OrderBy.Descending);
                        break;
                    default:
                        ApplyOrderBy(p => p.Name, Core.Enum.OrderBy.Ascending);
                        break;
                }
            }
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
            // Apply filtering based on product type And product brand
            if (productBrandId.HasValue || productTypeId.HasValue)
            {
                // Combine the conditions using And operator
                ApplyCriteria(p =>
                    (!productBrandId.HasValue || p.ProductBrandId == productBrandId.Value) &&
                    (!productTypeId.HasValue || p.ProductTypeId == productTypeId.Value));
            }

            if (Skip >= 0 && Take > 0)
            {
                ApplyPaging(Skip, Take);
            }
            if (!string.IsNullOrEmpty(search))
            {
                // Apply search criteria
                ApplyCriteria(p =>
                    p.Name.ToLower().Contains(search.ToLower()));

            }
        }


        public ProductsWithTypesAndBrandSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }

    }
}
//public ProductsWithTypesAndBrandSpecification(int id)
//   : base(p => p.Id == id)
//{
//    AddInclude(p => p.ProductBrand);
//    AddInclude(p => p.ProductType);
//}
//if (!string.IsNullOrEmpty(sort))
//{
//    switch (sort.ToLower())
//    {
//        case "priceasc":
//            ApplyOrderBy(p => p.Price, Core.Enum.OrderBy.Ascending);
//            break;
//        case "pricedesc":
//            ApplyOrderBy(p => p.Price, Core.Enum.OrderBy.Descending);
//            break;
//        case "namedesc":
//            ApplyOrderBy(p => p.Name, Core.Enum.OrderBy.Descending);
//            break;
//        default:
//            ApplyOrderBy(p => p.Name, Core.Enum.OrderBy.Ascending);
//            break;
//    }
//}

