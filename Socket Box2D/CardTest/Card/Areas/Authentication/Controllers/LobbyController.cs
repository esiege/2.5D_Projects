using System;
using System.Collections.Generic;
using System.Web.Http;
using Card.Generics;

namespace Card.Areas.Authentication.Controllers
{
    public class LobbyController : ApiController
    {
        [Authorize]
        public dynamic GetIt()
        {
            return Ok(Order.CreateOrders());
        }
        [Authorize]
        [HttpPost]
        public dynamic GetItPost()
        {
            return Ok(Order.CreateOrders());
        }

    }

    //<----TODO: Change 'Order' to gamestate, 



    public class Order
    {
        public int OrderID { get; set; }
        public string CustomerName { get; set; }
        public string ShipperCity { get; set; }
        public Boolean IsShipped { get; set; }

        public static List<Order> CreateOrders()
        {
            List<Order> OrderList = new List<Order>
            {
                new Order {OrderID = 10248, CustomerName = "Taiseer Joudeh", ShipperCity = "Amman", IsShipped = true },
                new Order {OrderID = 10249, CustomerName = "Ahmad Hasan", ShipperCity = "Dubai", IsShipped = false},
                new Order {OrderID = 10250, CustomerName = "Tamer Yaser", ShipperCity = "Jeddah", IsShipped = false },
                new Order {OrderID = 10251, CustomerName = "Lina Majed", ShipperCity = "Abu Dhabi", IsShipped = false},
                new Order {OrderID = 10252, CustomerName = "Yasmeen Rami", ShipperCity = "Kuwait", IsShipped = true}
            };

            return OrderList;
        }
    }
}
