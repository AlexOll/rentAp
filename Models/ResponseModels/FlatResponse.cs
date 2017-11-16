using RentApp.Models.DbModels;
using System;

namespace RentApp.Models.ResponseModels
{
    public class FlatResponse
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public float Cost { get; set; }
        public float Area { get; set; }
        public int RoomsCount { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime LastRepairDate { get; set; }
        public DateTime ReleaseDate { get; set; }

        public FlatResponse(Flat model)
        {
            Id = model.Id;
            Description = model.Description;
            Cost = model.Cost;
            Area = model.Area;
            RoomsCount = model.RoomsCount;
            CreateDate = model.CreateDate;
            UpdateDate = model.UpdateDate;
            LastRepairDate = model.LastRepairDate;
            ReleaseDate = model.ReleaseDate;


        }
    }
}
