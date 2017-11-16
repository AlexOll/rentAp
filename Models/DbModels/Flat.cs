﻿using RentApp.Models.ResponseModels;
using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class Flat
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public float Cost { get; set; }
        public float Area { get; set; }
        public int RoomsCount { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime LastRepairDate { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool IsAlive { get; set; }

        public static explicit operator FlatResponse(Flat model)
        {
            return new FlatResponse(model);
        }
    }
}
