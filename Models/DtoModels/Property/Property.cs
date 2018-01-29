using RentApp.Models.Interfaces;
using RentApp.Utilities;
using System;
using System.Collections.Generic;

namespace RentApp.Models.DtoModels.Property
{
    public class Property : IProperty
    {
        public Property(double? area, double lat, double lng, string locationName, List<string> photoURLs)
        {
            Area = area;
            Lat = lat;
            Lng = lng;
            LocationName = locationName;

            var imageUtility = new ImageUtility();
            photoURLs.ForEach(f => ImageIdList.Add(imageUtility.UpdateImageId(null, f)));
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public double? Area { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string LocationName { get; set; }
        public List<Guid?> ImageIdList { get; set; } = new List<Guid?>();
    }
}
