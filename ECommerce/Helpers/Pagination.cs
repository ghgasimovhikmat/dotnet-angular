namespace API.Helpers
{
    namespace API.Helpers
    {
        public class Pagination<T> where T : class
        {
            public Pagination(int pageIndex, int pageSize, int count, IReadOnlyList<T> data)
            {
                PageIndex = pageIndex;
                PageSize = pageSize;
                TotalItems = count;
                Data = data;
            }

            public int PageIndex { get; }
            public int PageSize { get; }
            public int TotalItems { get; }
            public IReadOnlyList<T> Data { get; }
        }
    }

}
