
using System;
using System.Collections.Generic;

namespace RentApp.Models.DbModels
{
    public class PropertyDBModel
    {
        public Guid Id { get; set; }
        public double? Area { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string LocationName { get; set; }
        public int? FloorNumber { get; set; }
        public int? FloorQuantity { get; set; }
        public bool? WithFurniture { get; set; }
        public bool? WithBalcony { get; set; }
        public bool? WithParking { get; set; }
        public bool? WithTerrace { get; set; }
        public int? RoomsQuantity { get; set; }

        public List<PropertyPhoto> ImageIdList { get; set; }
    }
}
