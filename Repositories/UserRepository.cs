﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RentApp.Models;
using Microsoft.EntityFrameworkCore;

namespace RentApp.Repositories
{
    public class UserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        internal List<User> GetAll()
        {
            using (_context)
            {
                return _context.Users.Where(w=>w.IsAlive).ToList();
            }
        }

        internal User GetById(Guid guid)
        {
            using (_context)
            {
                return _context.Users.FirstOrDefault(f => f.Id == guid);
            }
        }

        internal void Create(User user)
        {
            using (_context)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
        }

        internal void Update(User user)
        {
            using (_context)
            {
                _context.Users.Attach(user);
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }
    }
}
