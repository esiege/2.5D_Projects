﻿

// ------------------------------------------------------------------------------------------------
// This code was generated by EntityFramework Reverse POCO Generator (http://www.reversepoco.com/).
// Created by Simon Hughes (https://about.me/simon.hughes).
// 
// Do not make changes directly to this file - edit the template instead.
// 
// The following connection settings were used to generate this file:
//     Configuration file:     "CardTest\Web.config"
//     Connection String Name: "CardTestContext"
//     Connection String:      "Data Source=localhost;Initial Catalog=CT;Persist Security Info=True;User ID=dev;password=**zapped**;"
// ------------------------------------------------------------------------------------------------
// Database Edition       : Developer Edition (64-bit)
// Database Engine Edition: Enterprise

// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.51
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

namespace CardTest.POCOS
{
    using System.Linq;

    // ************************************************************************
    // Unit of work
    public interface ICardTestContext : System.IDisposable
    {
        System.Data.Entity.DbSet<ActiveUser> ActiveUsers { get; set; } // ActiveUsers
        System.Data.Entity.DbSet<AuthUser> AuthUsers { get; set; } // AuthUser
        System.Data.Entity.DbSet<UserAccount> UserAccounts { get; set; } // UserAccounts
        System.Data.Entity.DbSet<UserAction> UserActions { get; set; } // UserActions
        System.Data.Entity.DbSet<UserActionXUser> UserActionXUsers { get; set; } // UserAction_x_User

        int SaveChanges();
        System.Threading.Tasks.Task<int> SaveChangesAsync();
        System.Threading.Tasks.Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken);
    }

    // ************************************************************************
    // Database context
    public class CardTestContext : System.Data.Entity.DbContext, ICardTestContext
    {
        public System.Data.Entity.DbSet<ActiveUser> ActiveUsers { get; set; } // ActiveUsers
        public System.Data.Entity.DbSet<AuthUser> AuthUsers { get; set; } // AuthUser
        public System.Data.Entity.DbSet<UserAccount> UserAccounts { get; set; } // UserAccounts
        public System.Data.Entity.DbSet<UserAction> UserActions { get; set; } // UserActions
        public System.Data.Entity.DbSet<UserActionXUser> UserActionXUsers { get; set; } // UserAction_x_User
        
        static CardTestContext()
        {
            System.Data.Entity.Database.SetInitializer<CardTestContext>(null);
        }

        public CardTestContext()
            : base("Name=CardTestContext")
        {
        }

        public CardTestContext(string connectionString) : base(connectionString)
        {
        }

        public CardTestContext(string connectionString, System.Data.Entity.Infrastructure.DbCompiledModel model) : base(connectionString) //another param, model - needed for dbcontext
        {
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        public bool IsSqlParameterNull(System.Data.SqlClient.SqlParameter param)
        {
            var sqlValue = param.SqlValue;
            var nullableValue = sqlValue as System.Data.SqlTypes.INullable;
            if (nullableValue != null)
                return nullableValue.IsNull;
            return (sqlValue == null || sqlValue == System.DBNull.Value);
        }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new ActiveUserConfiguration());
            modelBuilder.Configurations.Add(new AuthUserConfiguration());
            modelBuilder.Configurations.Add(new UserAccountConfiguration());
            modelBuilder.Configurations.Add(new UserActionConfiguration());
            modelBuilder.Configurations.Add(new UserActionXUserConfiguration());
        }

        public static System.Data.Entity.DbModelBuilder CreateModel(System.Data.Entity.DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new ActiveUserConfiguration(schema));
            modelBuilder.Configurations.Add(new AuthUserConfiguration(schema));
            modelBuilder.Configurations.Add(new UserAccountConfiguration(schema));
            modelBuilder.Configurations.Add(new UserActionConfiguration(schema));
            modelBuilder.Configurations.Add(new UserActionXUserConfiguration(schema));
            return modelBuilder;
        }
    }

    // ************************************************************************
    // Fake Database context
    [System.CodeDom.Compiler.GeneratedCodeAttribute("EF.Reverse.POCO.Generator", "2.18.1.0")]
    public class FakeCardTestContext : ICardTestContext
    {
        public System.Data.Entity.DbSet<ActiveUser> ActiveUsers { get; set; }
        public System.Data.Entity.DbSet<AuthUser> AuthUsers { get; set; }
        public System.Data.Entity.DbSet<UserAccount> UserAccounts { get; set; }
        public System.Data.Entity.DbSet<UserAction> UserActions { get; set; }
        public System.Data.Entity.DbSet<UserActionXUser> UserActionXUsers { get; set; }

        public FakeCardTestContext()
        {
            ActiveUsers = new FakeDbSet<ActiveUser>("Id");
            AuthUsers = new FakeDbSet<AuthUser>("Id", "AuthId", "UserName");
            UserAccounts = new FakeDbSet<UserAccount>("Id");
            UserActions = new FakeDbSet<UserAction>("Id");
            UserActionXUsers = new FakeDbSet<UserActionXUser>("Id");
        }
        
        public int SaveChangesCount { get; private set; } 
        public int SaveChanges()
        {
            ++SaveChangesCount;
            return 1;
        }

        public System.Threading.Tasks.Task<int> SaveChangesAsync()
        {
            ++SaveChangesCount;
            return System.Threading.Tasks.Task<int>.Factory.StartNew(() => 1);
        }

        public System.Threading.Tasks.Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken)
        {
            ++SaveChangesCount;
            return System.Threading.Tasks.Task<int>.Factory.StartNew(() => 1, cancellationToken);
        }

        protected virtual void Dispose(bool disposing)
        {
        }
        
        public void Dispose()
        {
            Dispose(true);
        }
    }

    // ************************************************************************
    // Fake DbSet
    // Implementing Find:
    //      The Find method is difficult to implement in a generic fashion. If
    //      you need to test code that makes use of the Find method it is
    //      easiest to create a test DbSet for each of the entity types that
    //      need to support find. You can then write logic to find that
    //      particular type of entity, as shown below:
    //      public class FakeBlogDbSet : FakeDbSet<Blog>
    //      {
    //          public override Blog Find(params object[] keyValues)
    //          {
    //              var id = (int) keyValues.Single();
    //              return this.SingleOrDefault(b => b.BlogId == id);
    //          }
    //      }
    //      Read more about it here: https://msdn.microsoft.com/en-us/data/dn314431.aspx
    [System.CodeDom.Compiler.GeneratedCodeAttribute("EF.Reverse.POCO.Generator", "2.18.1.0")]
    public class FakeDbSet<TEntity> : System.Data.Entity.DbSet<TEntity>, IQueryable, System.Collections.Generic.IEnumerable<TEntity>, System.Data.Entity.Infrastructure.IDbAsyncEnumerable<TEntity> where TEntity : class 
    { 
        private readonly System.Reflection.PropertyInfo[] _primaryKeys;
        private readonly System.Collections.ObjectModel.ObservableCollection<TEntity> _data;
        private readonly IQueryable _query;
 
        public FakeDbSet() 
        { 
            _data = new System.Collections.ObjectModel.ObservableCollection<TEntity>(); 
            _query = _data.AsQueryable(); 
        }

        public FakeDbSet(params string[] primaryKeys)
        {
            _primaryKeys = typeof(TEntity).GetProperties().Where(x => primaryKeys.Contains(x.Name)).ToArray();
            _data = new System.Collections.ObjectModel.ObservableCollection<TEntity>(); 
            _query = _data.AsQueryable(); 
        }

        public override TEntity Find(params object[] keyValues)
        {
            if (_primaryKeys == null)
                throw new System.ArgumentException("No primary keys defined");
            if (keyValues.Length != _primaryKeys.Length)
                throw new System.ArgumentException("Incorrect number of keys passed to Find method");

            var keyQuery = this.AsQueryable();
            keyQuery = keyValues
                .Select((t, i) => i)
                .Aggregate(keyQuery,
                    (current, x) =>
                        current.Where(entity => _primaryKeys[x].GetValue(entity, null).Equals(keyValues[x])));

            return keyQuery.SingleOrDefault();
        }

        public override System.Threading.Tasks.Task<TEntity> FindAsync(System.Threading.CancellationToken cancellationToken, params object[] keyValues)
        {
            return System.Threading.Tasks.Task<TEntity>.Factory.StartNew(() => Find(keyValues), cancellationToken);
        }

        public override System.Threading.Tasks.Task<TEntity> FindAsync(params object[] keyValues)
        {
            return System.Threading.Tasks.Task<TEntity>.Factory.StartNew(() => Find(keyValues));
        }

        public override System.Collections.Generic.IEnumerable<TEntity> AddRange(System.Collections.Generic.IEnumerable<TEntity> entities)
        {
            if (entities == null) throw new System.ArgumentNullException("entities");
            var items = entities.ToList();
            foreach (var entity in items)
            {
                _data.Add(entity);
            }
            return items;
        }
        
        public override TEntity Add(TEntity item) 
        {
            if (item == null) throw new System.ArgumentNullException("item");
            _data.Add(item); 
            return item; 
        } 
 
        public override TEntity Remove(TEntity item) 
        {
            if (item == null) throw new System.ArgumentNullException("item");
            _data.Remove(item); 
            return item; 
        } 
 
        public override TEntity Attach(TEntity item) 
        {
            if (item == null) throw new System.ArgumentNullException("item");
            _data.Add(item); 
            return item; 
        } 
 
        public override TEntity Create() 
        { 
            return System.Activator.CreateInstance<TEntity>(); 
        } 
 
        public override TDerivedEntity Create<TDerivedEntity>() 
        { 
            return System.Activator.CreateInstance<TDerivedEntity>(); 
        } 
 
        public override System.Collections.ObjectModel.ObservableCollection<TEntity> Local 
        { 
            get { return _data; } 
        } 
 
        System.Type IQueryable.ElementType
        { 
            get { return _query.ElementType; } 
        } 
 
        System.Linq.Expressions.Expression IQueryable.Expression 
        { 
            get { return _query.Expression; } 
        } 
 
        IQueryProvider IQueryable.Provider 
        { 
            get { return new FakeDbAsyncQueryProvider<TEntity>(_query.Provider); } 
        } 
 
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() 
        { 
            return _data.GetEnumerator(); 
        } 
 
        System.Collections.Generic.IEnumerator<TEntity> System.Collections.Generic.IEnumerable<TEntity>.GetEnumerator() 
        { 
            return _data.GetEnumerator(); 
        } 
 
        System.Data.Entity.Infrastructure.IDbAsyncEnumerator<TEntity> System.Data.Entity.Infrastructure.IDbAsyncEnumerable<TEntity>.GetAsyncEnumerator() 
        { 
            return new FakeDbAsyncEnumerator<TEntity>(_data.GetEnumerator()); 
        }
    } 
 
    public class FakeDbAsyncQueryProvider<TEntity> : System.Data.Entity.Infrastructure.IDbAsyncQueryProvider 
    { 
        private readonly IQueryProvider _inner; 
 
        public FakeDbAsyncQueryProvider(IQueryProvider inner) 
        { 
            _inner = inner; 
        } 
 
        public IQueryable CreateQuery(System.Linq.Expressions.Expression expression) 
        { 
            return new FakeDbAsyncEnumerable<TEntity>(expression); 
        } 
 
        public IQueryable<TElement> CreateQuery<TElement>(System.Linq.Expressions.Expression expression) 
        { 
            return new FakeDbAsyncEnumerable<TElement>(expression); 
        } 
 
        public object Execute(System.Linq.Expressions.Expression expression) 
        { 
            return _inner.Execute(expression); 
        } 
 
        public TResult Execute<TResult>(System.Linq.Expressions.Expression expression) 
        { 
            return _inner.Execute<TResult>(expression); 
        } 
 
        public System.Threading.Tasks.Task<object> ExecuteAsync(System.Linq.Expressions.Expression expression, System.Threading.CancellationToken cancellationToken) 
        { 
            return System.Threading.Tasks.Task.FromResult(Execute(expression)); 
        } 
 
        public System.Threading.Tasks.Task<TResult> ExecuteAsync<TResult>(System.Linq.Expressions.Expression expression, System.Threading.CancellationToken cancellationToken) 
        { 
            return System.Threading.Tasks.Task.FromResult(Execute<TResult>(expression)); 
        } 
    } 
 
    public class FakeDbAsyncEnumerable<T> : EnumerableQuery<T>, System.Data.Entity.Infrastructure.IDbAsyncEnumerable<T>, IQueryable<T> 
    { 
        public FakeDbAsyncEnumerable(System.Collections.Generic.IEnumerable<T> enumerable) 
            : base(enumerable) 
        { } 
 
        public FakeDbAsyncEnumerable(System.Linq.Expressions.Expression expression) 
            : base(expression) 
        { } 
 
        public System.Data.Entity.Infrastructure.IDbAsyncEnumerator<T> GetAsyncEnumerator() 
        { 
            return new FakeDbAsyncEnumerator<T>(this.AsEnumerable().GetEnumerator()); 
        } 
 
        System.Data.Entity.Infrastructure.IDbAsyncEnumerator System.Data.Entity.Infrastructure.IDbAsyncEnumerable.GetAsyncEnumerator() 
        { 
            return GetAsyncEnumerator(); 
        } 
 
        IQueryProvider IQueryable.Provider 
        { 
            get { return new FakeDbAsyncQueryProvider<T>(this); } 
        } 
    } 
 
    public class FakeDbAsyncEnumerator<T> : System.Data.Entity.Infrastructure.IDbAsyncEnumerator<T> 
    { 
        private readonly System.Collections.Generic.IEnumerator<T> _inner; 
 
        public FakeDbAsyncEnumerator(System.Collections.Generic.IEnumerator<T> inner) 
        { 
            _inner = inner; 
        } 
 
        public void Dispose() 
        { 
            _inner.Dispose(); 
        } 
 
        public System.Threading.Tasks.Task<bool> MoveNextAsync(System.Threading.CancellationToken cancellationToken) 
        { 
            return System.Threading.Tasks.Task.FromResult(_inner.MoveNext()); 
        } 
 
        public T Current 
        { 
            get { return _inner.Current; } 
        } 
 
        object System.Data.Entity.Infrastructure.IDbAsyncEnumerator.Current 
        { 
            get { return Current; } 
        } 
    }

    // ************************************************************************
    // POCO classes

    // ActiveUsers
    public class ActiveUser
    {
        public int Id { get; set; } // Id (Primary key)
        public int UserAccountId { get; set; } // UserAccountId
        public string Ip { get; set; } // Ip
        public float? SessionId { get; set; } // SessionId
        public System.DateTime LastConnection { get; set; } // LastConnection
        public string Status { get; set; } // Status
        public string Chunk { get; set; } // Chunk
    }

    // AuthUser
    public class AuthUser
    {
        public int Id { get; set; } // Id
        public string AuthId { get; set; } // AuthId
        public string UserName { get; set; } // UserName
    }

    // UserAccounts
    public class UserAccount
    {
        public int Id { get; set; } // Id (Primary key)
        public string UserName { get; set; } // UserName
        public string Password { get; set; } // Password
        public string Email { get; set; } // Email
    }

    // UserActions
    public class UserAction
    {
        public int Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name
    }

    // UserAction_x_User
    public class UserActionXUser
    {
        public int Id { get; set; } // Id (Primary key)
        public string PlayerId { get; set; } // PlayerId
        public string Slot { get; set; } // Slot
        public string ActionId { get; set; } // ActionId
    }


    // ************************************************************************
    // POCO Configuration

    // ActiveUsers
    public class ActiveUserConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<ActiveUser>
    {
        public ActiveUserConfiguration()
            : this("dbo")
        {
        }
 
        public ActiveUserConfiguration(string schema)
        {
            ToTable(schema + ".ActiveUsers");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.UserAccountId).HasColumnName("UserAccountId").IsRequired().HasColumnType("int");
            Property(x => x.Ip).HasColumnName("Ip").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.SessionId).HasColumnName("SessionId").IsOptional().HasColumnType("real");
            Property(x => x.LastConnection).HasColumnName("LastConnection").IsRequired().HasColumnType("datetime");
            Property(x => x.Status).HasColumnName("Status").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.Chunk).HasColumnName("Chunk").IsOptional().IsFixedLength().HasColumnType("nchar").HasMaxLength(10);
        }
    }

    // AuthUser
    public class AuthUserConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<AuthUser>
    {
        public AuthUserConfiguration()
            : this("dbo")
        {
        }
 
        public AuthUserConfiguration(string schema)
        {
            ToTable(schema + ".AuthUser");
            HasKey(x => new { x.Id, x.AuthId, x.UserName });

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.AuthId).HasColumnName("AuthId").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(128);
            Property(x => x.UserName).HasColumnName("UserName").IsRequired().HasColumnType("nvarchar").HasMaxLength(256);
        }
    }

    // UserAccounts
    public class UserAccountConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<UserAccount>
    {
        public UserAccountConfiguration()
            : this("dbo")
        {
        }
 
        public UserAccountConfiguration(string schema)
        {
            ToTable(schema + ".UserAccounts");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.UserName).HasColumnName("UserName").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.Password).HasColumnName("Password").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.Email).HasColumnName("Email").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
        }
    }

    // UserActions
    public class UserActionConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<UserAction>
    {
        public UserActionConfiguration()
            : this("dbo")
        {
        }
 
        public UserActionConfiguration(string schema)
        {
            ToTable(schema + ".UserActions");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.Name).HasColumnName("Name").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
        }
    }

    // UserAction_x_User
    public class UserActionXUserConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<UserActionXUser>
    {
        public UserActionXUserConfiguration()
            : this("dbo")
        {
        }
 
        public UserActionXUserConfiguration(string schema)
        {
            ToTable(schema + ".UserAction_x_User");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.PlayerId).HasColumnName("PlayerId").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.Slot).HasColumnName("Slot").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
            Property(x => x.ActionId).HasColumnName("ActionId").IsOptional().HasColumnType("nvarchar").HasMaxLength(4000);
        }
    }

}
// </auto-generated>

