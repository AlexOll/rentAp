using System.Collections.Generic;
using System.Linq;
using RentApp.Models;
using Microsoft.EntityFrameworkCore;
using RentApp.Models.DbModels;
using RentApp.Cache;
using System;

namespace RentApp.Repositories
{
    public class UserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        internal List<User> GetAllAlive()
        {
            using (_context)
            {
                return _context.Users.Where(w => w.IsAlive).ToList();
            }
        }

        internal void Create(User user)
        {
            user.CreateDateTime = DateTime.Now;
            using (_context)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            UserCache.AddOrUpdate(user);
        }

        internal void Update(User user)
        {
            user.UpdateDate = DateTime.Now;
            using (_context)
            {
                _context.Users.Attach(user);
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
            }
            UserCache.AddOrUpdate(user);
        }

        internal void Update(IEnumerable<User> result)
        {
            using (_context)
            {
                foreach (var user in result)
                {
                    _context.Users.Attach(user);
                    _context.Entry(user).State = EntityState.Modified;
                }

                _context.SaveChanges();
            }
        }
    }
}
