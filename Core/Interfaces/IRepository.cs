using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IRepository<T> where T:BaseEntity
    {
        //Task<T> GetProductByIdAsync(int Id);
        Task<T> GetProductByIdAsync(ISpecification<T> spec);
        Task<IList<T>>  ListAsync();
        Task<IList<T>> ListAsync(ISpecification<T> spec);
        Task<IList<T>> GetProductBrandsAsync();
        Task<IList<T>> GetProductTypesAsync();
        Task<int> CountAsync(ISpecification<T> spec);
    }
}
