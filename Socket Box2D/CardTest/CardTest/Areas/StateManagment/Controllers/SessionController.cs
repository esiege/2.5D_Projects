using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using CardTest.Models;
using CardTest.Processors;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.OAuth;
using CardTest.POCOS;
using System.Dynamic;

namespace CardTest.Areas.StateManagement.Controllers
{
    public class SessionController : BaseController<BaseModel>
    {
        private static float sessionIdCounter = 0;
        //AuthUser {Id, AuthId, UserName}

        public SessionController()
        {
            using (var ctx = new CardTestContext())
            {
                if (sessionIdCounter == 0)
                {
                    IQueryable<float?> sessionIds = (from au in ctx.ActiveUsers orderby au.SessionId descending select au.SessionId);

                    if (sessionIds.Any())
                    {
                        sessionIdCounter = Convert.ToInt32(sessionIds.First()) + 1;
                    }
                    else
                    {
                        sessionIdCounter = 1;
                    }
                }
            }
        }


        [Authorize]
        public dynamic EnableMatching()
        {
            using (var ctx = new CardTestContext())
            {
                dynamic results = new ExpandoObject();
                string clientIp = GetClientIp();

                ActiveUser activeAccount = ctx.ActiveUsers.FirstOrDefault(x => x.UserAccountId == AuthUser.Id && x.Ip == clientIp);

                if (activeAccount == null)
                {
                    activeAccount = ctx.ActiveUsers.Add(new ActiveUser
                    {
                        UserAccountId = AuthUser.Id,
                        Ip = clientIp,
                        SessionId = null,
                        LastConnection = DateTime.Now,
                        Status = "Matching"
                    });
                }
                else
                {
                    activeAccount.Status = "Matching";
                }


                if (activeAccount.Status == null) { activeAccount.Status = "Matching"; }

                results.status = "Matching";
                results.associationToken = AuthUser.AuthId;
                ctx.SaveChanges();
                return results;
            }
        }






        [Authorize]
        public dynamic GetIt()
        {
            var a = AuthUser;



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
