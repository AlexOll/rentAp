using System;
using System.Collections.Generic;
using System.Linq;
using RentApp.Models;
using Microsoft.EntityFrameworkCore;
using RentApp.Models.DbModels;
using RentApp.Cache;

namespace RentApp.Repositories
{
    public class RealEstateRepository
    {
        private readonly DataContext _context;

        public RealEstateRepository(DataContext context)
        {
            _context = context;
        }

        public List<RealEstateObject> GetAll()
        {
            using (_context)
            {
                return _context.RealEstateObjects
                    .Where(o => o.IsAlive)
                    .Include(o => o.RealEstateDetailes)
                    .ToList();
            }
        }

        public RealEstateObject GetById(Guid id)
        {
            using (_context)
            {
                return _context.RealEstateObjects
                    .Include(o => o.RealEstateDetailes)
                    .FirstOrDefault(o => o.Id == id);
            }
        }

        public void Create(RealEstateObject item)
        {
            using (_context)
            {
                _context.RealEstateObjects.Add(item);
                _context.SaveChanges();
            }
            RealEstateCache.AddOrUpdate(item);
        }

        public void Remove(Guid id)
        {
            RealEstateObject item = GetById(id); ;
            using (_context)
            {
                item.IsAlive = false;
                _context.RealEstateObjects.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
            RealEstateCache.AddOrUpdate(item);
        }

        internal void Update(RealEstateObject item)
        {
            using (_context)
            {
                item.UpdateDate = DateTime.Now;
                _context.RealEstateObjects.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
            RealEstateCache.AddOrUpdate(item);
        }
    }
}
