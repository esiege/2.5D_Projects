//using System;
//using System.Dynamic;
//using System.Linq;
//using System.Web.Http;
//using Card.Generics;
//using Card.POCOS;

//namespace Card.Controllers
//{
//	public class OldAccountController : BaseController<BaseModel>
//	{

//		[HttpPost]
//		public dynamic Login(UserAccount userAccount)
//		{
//			dynamic results = new ExpandoObject();
//			var ctx = new CardContext();
//			UserAccount account = ctx.UserAccounts.FirstOrDefault(x => x.UserName == userAccount.UserName);

//			if (account == null)
//			{
//				results.error = new ExpandoObject();
//				results.error.login = "Account/password not found.";
//				return results;
//			}

//			string activeIp = GetClientIp();

//			IQueryable<ActiveUser> oldActiveAccounts = ctx.ActiveUsers.Where(x => x.UserAccountId == account.Id);

//			foreach (ActiveUser au in oldActiveAccounts)
//			{
//				ctx.ActiveUsers.Remove(au);
//			}

//			ActiveUser activeAccount = new ActiveUser();

//			activeAccount.Ip = activeIp;
//			activeAccount.UserAccountId = account.Id;
//			activeAccount.LastConnection = DateTime.Now;

//			ctx.ActiveUsers.Add(activeAccount);
//			ctx.SaveChanges();

//			results.id = account.Id;
//			results.name = account.UserName;
//			return results;
//		}


//        [HttpPost]
//        public dynamic AddNewUser(UserAccount userAccount)
//        {
//            dynamic results = new ExpandoObject();
//            var ctx = new CardContext();

//            UserAccount existing = ctx.UserAccounts.FirstOrDefault(x => x.UserName == userAccount.UserName);

//            if (existing != null)
//            {
//                results.error = new ExpandoObject();
//                results.error.userName = "An account with this name already exists.";
//                return results;
//            }

//            ctx.UserAccounts.Add(userAccount);
//            ctx.SaveChanges();

//            results.id = userAccount.Id;
//            results.name = userAccount.UserName;
//            return userAccount;
//        }


//        [HttpGet]
//        public dynamic Test(int i)
//        {
//            return i;
//        }





//    }
//}

