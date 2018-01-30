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
        //public DbSet<Flat> Flats { get; set; }
	    //public DbSet<FlatOffer> FlatOffer { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Offer> Offers { get; set; }
        //public DbSet<RealEstateObject> RealEstateObjects { get; set; }
        //public DbSet<BaseRealEstateDetailes> RealEstateDetailes { get; set; }
        public DbSet<PropertyPhoto> PropertyPhotos { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //modelBuilder.Entity<GarageDetailes>().ToTable("GarageDetailes");
        //    //modelBuilder.Entity<AccommodationDetailes>().ToTable("AccommodationDetailes");
        //}

    }
}
