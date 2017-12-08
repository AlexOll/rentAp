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
                return _context.Flats.Where(f => f.IsAlive).ToList();
            }
        }

        internal Flat GetById(Guid id)
        {
            using (_context)
            {
                return _context.Flats.Where(f => f.IsAlive).FirstOrDefault(f => f.Id == id);
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
            // TODO: to implement it

            //using (_context)
            //{
            //    flat.UpdateDate = DateTime.Now;
            //    _context.Flats.Attach(flat);
            //    _context.Entry(flat).State = EntityState.Modified;
            //    _context.SaveChanges();
            //}
        }

        internal void Remove(Flat flat)
        {
            // TODO: to implement it

            //using (_context)
            //{
            //    flat.IsAlive = false;
            //    _context.Flats.Attach(flat);
            //    _context.Entry(flat).State = EntityState.Modified;
            //    _context.SaveChanges();
            //}
        }

    }
}
