namespace API.Helpers
{
    public class ProductParams
    {
        public string? Sort { get; set; } = "NameAsc";
        public int? ProductTypeId { get; set; }
        public int? ProductBrandId { get; set; }
        public int Skip { get; set; } = 0; // Keep Skip
        public int Take { get; set; } = 10; // Keep Take
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
    }

}
