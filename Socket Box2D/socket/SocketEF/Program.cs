using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity; 
    
namespace SocketEF
{
    class Program
    {
        static void Main(string[] args)
        {
            var context = new SocketContext();

            var actionList = new List<userActions>
            {
                new userActions { name = "Fire" },
                new userActions { name = "Fire2" },
                new userActions { name = "Fire3" },
            };
            actionList.ForEach(s => context.userActions.Add(s));
            context.SaveChanges();

        }
    }

    public class activeUsers
    {
        public int id { get; set; }
        public string player_id { get; set; }
        public string userName { get; set; }
        public string session_id { get; set; }
        public DateTime last_connection { get; set; }
        public string status { get; set; }
    }

    public class userAccounts
    {
        public int id { get; set; }
        public string player_id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }

    public class userActions_x_Users
    {
        public int id { get; set; }
        public string player_id { get; set; }
        public string slot { get; set; }
        public string action_id { get; set; }
    }

    public class userActions
    {
        public int id { get; set; }
        public string name { get; set; }

    }




    public class SocketContext : DbContext
    {
        protected override void OnModelCreating(DbModelBuilder DbmodelBuilder)
        {
            base.OnModelCreating(DbmodelBuilder);
            DbmodelBuilder.Conventions.Remove<PluralizingEntitySetNameConvention>();
        }

        public DbSet<activeUsers> activeUsers { get; set; }
        public DbSet<userAccounts> userAccounts { get; set; }
        public DbSet<userActions_x_Users> userActions_x_Users { get; set; }
        public DbSet<userActions> userActions { get; set; }

    }

  

}
