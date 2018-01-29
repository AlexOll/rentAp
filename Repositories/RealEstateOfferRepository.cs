using Microsoft.EntityFrameworkCore;
using RentApp.Cache;
using RentApp.Models;
using RentApp.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RentApp.Repositories
{
    public class OfferRepository
    {
        private readonly DataContext _context;

        public OfferRepository(DataContext context)
        {
            _context = context;
        }

        public List<RealEstateOffer> GetAll()
        {
            using (_context)
            {
                return _context.RealEstateOffers
                    .Where(o => o.IsAlive)
                    .Include(o => o.RealEstateObject)
                    .Include(o => o.RealEstateObject.RealEstateDetailes)
                    .Include(o => o.RealEstateObject.Photos)
                    .ToList();
            }
        }

        public RealEstateOffer GetById(Guid id)
        {
            using (_context)
            {
                return _context.RealEstateOffers
                    .Where(o => o.IsAlive)
                    .Include(o => o.RealEstateObject)
                    .Include(o => o.RealEstateObject.RealEstateDetailes)
                    .Include(o => o.RealEstateObject.Photos)
                    .FirstOrDefault(o => o.Id == id);
            }
        }

        public void Create(RealEstateOffer item)
        {
            using (_context)
            {
                _context.RealEstateObjects.Attach(item.RealEstateObject);
                _context.RealEstateOffers.Add(item);
                _context.SaveChanges();
            }
            RealEstateOfferCache.AddOrUpdate(item);
        }

        public void Remove(Guid id)
        {
            RealEstateOffer item = GetById(id); ;
            using (_context)
            {
                item.IsAlive = false;
                _context.RealEstateOffers.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
            RealEstateOfferCache.AddOrUpdate(item);
        }

        internal void Update(RealEstateOffer item)
        {
            using (_context)
            {
                item.UpdateDate = DateTime.Now;
                _context.RealEstateOffers.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
            RealEstateOfferCache.AddOrUpdate(item);
        }
    }
}
