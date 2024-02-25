using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Enum;
namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        OrderBy OrderByDirection { get; }
        Expression<Func<T, object>> OrderBy { get; }
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }

    }
   
}
