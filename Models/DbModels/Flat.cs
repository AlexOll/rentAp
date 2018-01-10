using RentApp.Models.ResponseModels;
using RentApp.Models.Structs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class Flat
    {
        [Key]
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public PropertyType PropertyType { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Price { get; set; }
        public float Area { get; set; }
        public int RoomsCount { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime LastRepairDate { get; set; }
        public DateTime ReleaseDate { get; set; }
        public List<RealEstatePhoto> PhotoIds { get; set; }
        public bool IsAlive { get; set; }

        public static explicit operator FlatResponse(Flat model)
        {
            return new FlatResponse(model);
        }
    }
}
