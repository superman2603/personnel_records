using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Personal_Records.Startup))]
namespace Personal_Records
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
