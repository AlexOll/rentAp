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

        public List<Offer> GetAll()
        {
            using (_context)
            {
                return _context.Offers
                    .Where(o => o.IsAlive)
                    .Include(o => o.RealEstateDetailes)
                    .Include(o => o.OfferDetailes)
                    .Include(o => o.Photos)
                    .ToList();
            }
        }

        public Offer GetById(Guid id)
        {
            using (_context)
            {
                return _context.Offers
                    .Where(o => o.IsAlive)
                    .Include(o => o.RealEstateDetailes)
                    .Include(o => o.OfferDetailes)
                    .Include(o => o.Photos)
                    .FirstOrDefault(o => o.Id == id);
            }
        }

        public void Create(Offer item)
        {
            using (_context)
            {
                _context.Offers.Add(item);
                _context.SaveChanges();
            }
            OfferCache.AddOrUpdate(item);
        }

        public void Update(Offer item)
        {
            using (_context)
            {
                item.UpdateDate = DateTime.Now;
                _context.Offers.Attach(item);
                _context.Entry(item).State = EntityState.Modified;

                _context.RealEstateDetailes.Attach(item.RealEstateDetailes);
                _context.Entry(item.RealEstateDetailes).State = EntityState.Modified;

                _context.OfferDetailes.Attach(item.OfferDetailes);
                _context.Entry(item.OfferDetailes).State = EntityState.Modified;

                _context.SaveChanges();
            }
            OfferCache.AddOrUpdate(item);
        }

        public void SoftRemove(Offer item)
        {
            using (_context)
            {
                item.IsAlive = false;
                _context.Offers.Attach(item);
                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
            OfferCache.AddOrUpdate(item);
        }

        public void RemovePhoto(OfferPhoto item)
        {
            using (_context)
            {
                _context.OfferPhotos.Remove(item);
                _context.SaveChanges();
            }
        }

    }
}
