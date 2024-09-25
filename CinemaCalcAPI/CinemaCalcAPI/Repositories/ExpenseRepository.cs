using CinemaCalcAPI.Context;
using CinemaCalcAPI.Interfaces;
using CinemaCalcAPI.Models;

namespace CinemaCalcAPI.Repositories
{
    public class ExpenseRepository : RepositoryBase<Expense>, IExpenseRepository
    {
        public ExpenseRepository(ApplicationDbContext databaseContext) : base(databaseContext)
        {

        }
    }
}
