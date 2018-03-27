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
        public DbSet<BaseRealEstateDetailes> RealEstateDetailes { get; set; }
        public DbSet<BaseOfferDetailes> OfferDetailes { get; set; }
        public DbSet<OfferPhoto> OfferPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GarageDetailes>().ToTable("GarageDetailes");
            modelBuilder.Entity<AccommodationDetailes>().ToTable("AccommodationDetailes");
            modelBuilder.Entity<LandDetailes>().ToTable("LandDetailes");

            modelBuilder.Entity<SaleOfferDetailes>().ToTable("SaleOfferDetailes");
            modelBuilder.Entity<LTRentOfferDetailes>().ToTable("LTRentOfferDetailes");
            modelBuilder.Entity<STRentOfferDetailes>().ToTable("STRentOfferDetailes");
            modelBuilder.Entity<RoommateOfferDetailes>().ToTable("RoommateOfferDetailes");
        }
    }
}
