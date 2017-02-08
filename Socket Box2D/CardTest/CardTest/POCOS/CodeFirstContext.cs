using System.Data.Entity;

namespace CardTest.POCOS
{

    public class KEEEE
    {
        public int Id { get; set; } // Id (Primary key)
        public string Chunk { get; set; } // Chunk
    }

    public class CodeFirstContext : DbContext
    {
        public DbSet<KEEEE> KEEEE { get; set; }
    }
}