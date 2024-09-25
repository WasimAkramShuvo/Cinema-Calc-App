using CinemaCalcAPI.Models;
using System.Linq.Expressions;

namespace CinemaCalcAPI.Interfaces
{
    public interface IRepositoryBase<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> GetAll();
        int Count();
        T GetSingle(int id);
        T GetSingle(Expression<Func<T, bool>> predicate);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Commit();
    }
}
