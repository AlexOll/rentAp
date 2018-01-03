using RentApp.Models.Structs;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class RealEstateObject
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Description { get; set; }
        public float Area { get; set; }
        public string PlaceId { get; set; }
        public PropertyType PropertyType { get; set; }
        public BaseRealEstateDetailes RealEstateDetailes { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsAlive { get; set; }

        // TODO: implement photo
        //public List<Photo> photos { get; set; }
    }
}
