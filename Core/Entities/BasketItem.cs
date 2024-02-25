using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class BasketItem 
    {
        public int Id { get; set; } // Quantity of the product in the basket
        public string ProductName { get; set; } // Quantity of the product in the basket
        public double Price { get; set; } // Quantity of the product in the basket
        public int Quantity { get; set; } // Quantity of the product in the basket
        public string PictureUrl { get; set; } // Price of the product at the time of adding to basket
        public string ProductBrand { get; set; } 
        public string ProductType { get; set; }
    }
}
