using System.Collections.Generic;
using System.Linq;
using RentApp.Models;
using Microsoft.EntityFrameworkCore;
using RentApp.Models.DbModels;
using RentApp.Cache;

namespace RentApp.Repositories
{
    public class MessageRepository
    {
        private readonly DataContext _context;

        public MessageRepository(DataContext context)
        {
            _context = context;
        }

        internal List<Message> GetAllAlive()
        {
            using (_context)
            {
                return _context.Messages.Where(w => w.IsAlive).ToList();
            }
        }

        internal void Create(Message addItem)
        {
            using (_context)
            {
                _context.Messages.Add(addItem);
                _context.SaveChanges();
            }
            MessageCache.AddOrUpdate(addItem);
        }

        internal void Update(Message updateItem)
        {
            using (_context)
            {
                _context.Messages.Attach(updateItem);
                _context.Entry(updateItem).State = EntityState.Modified;
                _context.SaveChanges();
            }
            MessageCache.AddOrUpdate(updateItem);
        }
    }
}
