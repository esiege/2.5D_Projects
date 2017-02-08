//using System;
//using System.Collections.Generic;
//using System.Dynamic;
//using System.Linq;
//using System.Web.Http;
//using Card.Generics;
//using Card.POCOS;

//namespace Card.Controllers
//{
//    public class OldLobbyController : ApiController
//    {

//        private static float sessionIdCounter = 0;
//        public OldLobbyController()
//        {
//            var ctx = new CardContext();
//            if (sessionIdCounter == 0)
//            {
//                IQueryable<float?> sessionIds = (from au in ctx.ActiveUsers orderby au.SessionId descending select au.SessionId);

//                if (sessionIds.Any())
//                {
//                    sessionIdCounter = Convert.ToInt32(sessionIds.First()) + 1;
//                }
//                else
//                {
//                    sessionIdCounter = 1;
//                }
//            }
//        }

//        [HttpPost]
//        public dynamic Match(UserAccount userAccount)
//        {


//            dynamic results = new ExpandoObject();
//            var ctx = new CardContext();
//            string clientIp = GetClientIp();
//            ActiveUser activeAccount = ctx.ActiveUsers.FirstOrDefault(x => x.UserAccountId == userAccount.Id && x.Ip == clientIp);

//            if (activeAccount == null)
//            {
//                results.error = new ExpandoObject();
//                results.error.login = "Account/password not found.";
//                return results;
//            }

//            if (activeAccount.Status == null) { activeAccount.Status = "Matching"; }

//            ctx.SaveChanges();

//            results.status = "Matching";
//            return results;
//        }




//        [HttpGet]
//        public dynamic AttemptPairing()
//        {
//            dynamic results = new ExpandoObject();
//            List<ActiveUser> users = new List<ActiveUser> { };
//            var ctx = new CardContext();

//            IQueryable<ActiveUser> usersMatching = ctx.ActiveUsers.Where(x => x.Status == "Matching").Take(2);
//            if (usersMatching.Count() == 2)
//            {
//                foreach (ActiveUser user in usersMatching)
//                {
//                    user.Status = "Match Found";
//                    user.LastConnection = DateTime.Now;
//                    user.SessionId = sessionIdCounter;

//                    users.Add(user);
//                }

//                results.sessionId = sessionIdCounter;

//                sessionIdCounter++;
//                ctx.SaveChanges();
//            }

//            results.users = users;
//            return results;
//        }



//    }
//}

