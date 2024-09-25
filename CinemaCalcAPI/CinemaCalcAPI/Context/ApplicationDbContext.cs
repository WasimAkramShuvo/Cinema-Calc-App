using Microsoft.EntityFrameworkCore;
using CinemaCalcAPI.Models;

namespace CinemaCalcAPI.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
    }
}
