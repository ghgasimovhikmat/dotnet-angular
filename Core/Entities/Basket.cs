using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Basket
    {
        public Basket() 
        { }

        public Basket(string id) 
        {
            Id = id;
        }
        public string Id { get; set; } // Assuming each basket belongs to a specific user
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}
