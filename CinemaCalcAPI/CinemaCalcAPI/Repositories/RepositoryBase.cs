using CinemaCalcAPI.Context;
using CinemaCalcAPI.Interfaces;
using CinemaCalcAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace CinemaCalcAPI.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T>
            where T : class, IEntityBase, new()
    {

        public ApplicationDbContext _context;

        #region Properties
        public RepositoryBase(ApplicationDbContext context)
        {
            _context = context;
        }
        #endregion
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().Where(x => x.IsDeleted != true).AsEnumerable();
        }

        public virtual int Count()
        {
            return _context.Set<T>().Count();
        }

        public T GetSingle(int id)
        {
            return _context.Set<T>().FirstOrDefault(x => x.Id == id && x.IsDeleted != true);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().FirstOrDefault(predicate);
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public virtual void Add(T entity)
        {
            entity.CreatedOn = DateTime.Now;
            entity.IsDeleted = false;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            _context.Set<T>().Add(entity);
        }

        public virtual void Update(T entity)
        {
            entity.ModifiedOn = DateTime.Now;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Delete(T entity)
        {
            entity.IsDeleted = true;
            entity.DeletedOn = DateTime.Now;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Commit()
        {
            _context.SaveChanges();
        }
    }
}