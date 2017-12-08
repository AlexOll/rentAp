using System;
using System.Collections.Generic;
using System.Linq;
using RentApp.Models;
using Microsoft.EntityFrameworkCore;
using RentApp.Models.DbModels;

namespace RentApp.Repositories
{
    public class FlatRepository
    {
        private readonly DataContext _context;

        public FlatRepository(DataContext context)
        {
            _context = context;
        }

        internal List<Flat> GetAll()
        {
            using (_context)
            {
                return _context.Flats.Where(w => w.IsAlive).ToList();
            }
        }

        internal Flat GetById(Guid id)
        {
            using (_context)
            {
                return _context.Flats.Where(w => w.IsAlive).FirstOrDefault(f => f.Id == id);
            }
        }

        internal void Create(Flat flat)
        {
            using (_context)
            {
                _context.Flats.Add(flat);
                _context.SaveChanges();
            }
        }

        internal void Update(Flat flat)
        {
            using (_context)
            {
                _context.Flats.Attach(flat);
                _context.Entry(flat).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

    }
}
