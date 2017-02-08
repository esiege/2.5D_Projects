
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CardTest.Areas.Authentication.Repositiories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;

namespace CardTest.Areas.Authentication.Classes
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            var a = 1;
        }
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (AuthRepository _repo = new AuthRepository())
            {
                IdentityUser user = await _repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }


                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("Id", user.Id));
                identity.AddClaim(new Claim("UserName", user.UserName));
                identity.AddClaim(new Claim("role", "user"));
                context.Validated(identity);
            }



        }

    }
}