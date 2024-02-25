using Core.Enum;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria { get; private set; } = _ => true;
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public OrderBy OrderByDirection { get; private set; } = Core.Enum.OrderBy.Ascending;
        public Expression<Func<T, object>> OrderBy { get; private set; }
        public int Take { get; private set; } = -1; // No paging by default.
        public int Skip { get; private set; } = 0; // Start from the first record by default.

        public bool IsPagingEnabled { get; private set; } = false;
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        public void ApplyCriteria(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }
        public void ApplyOrderBy(Expression<Func<T, object>> orderBy, OrderBy direction)
        {
            OrderBy = orderBy;
            OrderByDirection = direction;
        }
        public void ApplyPaging(int skip,int take)
        {
            Skip = skip;
            Take = take;
            
        }
        // Constructor that accepts filter parameters
        protected BaseSpecification(
            Expression<Func<T, bool>> filter = null,
            Expression<Func<T, object>> orderBy = null,
            OrderBy orderByDirection = Core.Enum.OrderBy.Ascending,
            List<Expression<Func<T, object>>> includes = null,
            int skip = 0,
            int take = -1)
        {
            if (filter != null)
            {
                Criteria = filter;
            }

            if (orderBy != null)
            {
                OrderBy = orderBy;
                OrderByDirection = orderByDirection;
            }

            if (includes != null)
            {
                Includes = includes;
            }

            if (take > 0)
            {
                Take = take;
                IsPagingEnabled = true;
            }

            if (skip >= 0)
            {
                Skip = skip;
            }
        }
        //public BaseSpecification(Expression<Func<T, bool>> criteria)
        //{
        //    Criteria = criteria;
        //}

        //public BaseSpecification()
        //{
        //}
    }

}
