using Microsoft.EntityFrameworkCore;
using RentApp.Models.DbModels;

namespace RentApp.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<RealEstatePhoto> RealEstatePhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccommodationDetailes>();
            modelBuilder.Entity<GarageDetailes>();
            modelBuilder.Entity<LandDetailes>();

            modelBuilder.Entity<SaleOfferDetailes>();
            modelBuilder.Entity<LTRentOfferDetailes>();
            modelBuilder.Entity<STRentOfferDetailes>();
            modelBuilder.Entity<RoommateOfferDetailes>();
        }
    }
}
