using System.Web;

namespace CardTest.Areas.Authentication.Classes
{
    public class APIHandler : IHttpModule
    {
        public void Dispose() { }

        public void Init(HttpApplication context)
        {
            context.PreSendRequestHeaders += delegate
            {
                if (context.Request.HttpMethod == "OPTIONS")
                {
                    var response = context.Response;
                    response.StatusCode = 200;
                }
            };
        }

    }
}