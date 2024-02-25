using Core.Entities;
using Core.Enum;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly EcommerceContext _context;

        public Repository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<T> GetProductByIdAsync(int id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IList<T>> ListAsync()
        {
            return await ApplySpecification(null).ToListAsync();
        }

        public async Task<T> GetProductByIdAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

       
        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            var query = _context.Set<T>().AsQueryable();

            if (spec != null)
            {
                if (spec.Criteria != null)
                {
                    query = query.Where(spec.Criteria);
                }

                foreach (var include in spec.Includes)
                {
                    query = query.Include(include);
                }
                if (spec.IsPagingEnabled)
                {
                    query=query.Skip(spec.Skip).Take(spec.Take);
                }

                if (spec.OrderBy != null)
                {
                    if (spec.OrderByDirection == OrderBy.Ascending)
                    {
                        if (spec.OrderBy != null)
                        {
                            query = query.OrderBy(spec.OrderBy);
                        }
                    }
                    else if (spec.OrderByDirection == OrderBy.Descending)
                    {
                        if (spec.OrderBy != null)
                        {
                            query = query.OrderByDescending(spec.OrderBy);
                        }
                    }
                }
              
            }

            return query;
        }

        public async Task<IList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<IList<T>> GetProductBrandsAsync()
        {
            // Example for ProductBrand, you can replace with the appropriate DbSet
            return (IList<T>)await _context.Set<ProductBrand>().ToListAsync();
        }

        public async Task<IList<T>> GetProductTypesAsync()
        {
            // Example for ProductType, you can replace with the appropriate DbSet
            return (IList<T>)await _context.Set<ProductType>().ToListAsync();
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
          return await ApplySpecification(spec).CountAsync();
        }
    }
}

//private IQueryable<T> ApplySpecification(ISpecification<T> spec)
//{
//    var query = _context.Set<T>().AsQueryable();

//    if (spec != null)
//    {
//        if (spec.Criteria != null)
//        {
//            query = query.Where(spec.Criteria);
//        }
//        foreach (var include in spec.Includes)
//        {
//            query = query.Include(include);
//        }
//    }

//    return query;
//}