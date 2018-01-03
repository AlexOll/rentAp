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
        }

        public void RemoveTotaly(Guid id)
        {
            using (_context)
            {
                RealEstateObject item = GetById(id);

                _context.RealEstateObjects.Attach(item);
                _context.RealEstateObjects.Remove(item);
                _context.SaveChanges();
            }
        }

        public void Remove(Guid id)
        {
            using (_context)
            {
                RealEstateObject item = GetById(id);

                item.IsAlive = false;
                _context.RealEstateObjects.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
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
        }
    }
}
