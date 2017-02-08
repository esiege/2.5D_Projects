//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Http;
//using Card.Areas.Authentication.Repositiories;
//using Card.Generics;
//using Card.Models;
//using Card.POCOS;
//using Microsoft.AspNet.Identity;

//namespace Card.Areas.Authentication.Controllers
//{
//    [RoutePrefix("api/Account")]
//    public class AccountController : BaseController<BaseModel>
//    {
//        private AuthRepository _repo = null;

//        public AccountController()
//        {
//            _repo = new AuthRepository();
//        }

//        [HttpPost]
//        public bool EnableMatchSearching(dynamic userConfig)
//        {
//            using (var ctx = new CardContext())
//            {
//                var user = HttpContext.Current.User.Identity;



//                //return ctx.As

//                return true;
//            }
//        }

//        // POST api/Account/Register
//        [AllowAnonymous]
//        [Route("Register")]
//        public async Task<IHttpActionResult> Register(UserModel userModel)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            IdentityResult result = await _repo.RegisterUser(userModel);
//            IHttpActionResult errorResult = GetErrorResult(result);

//            if (errorResult != null)
//            {
//                return errorResult;
//            }

//            return Ok();
//        }

//        protected override void Dispose(bool disposing)
//        {
//            if (disposing)
//            {
//                _repo.Dispose();
//            }

//            base.Dispose(disposing);
//        }

//        private IHttpActionResult GetErrorResult(IdentityResult result)
//        {
//            if (result == null)
//            {
//                return InternalServerError();
//            }

//            if (!result.Succeeded)
//            {
//                if (result.Errors != null)
//                {
//                    foreach (string error in result.Errors)
//                    {
//                        ModelState.AddModelError("", error);
//                    }
//                }

//                if (ModelState.IsValid)
//                    return BadRequest();

//                return BadRequest(ModelState);
//            }

//            return null;
//        }
//    }
//}