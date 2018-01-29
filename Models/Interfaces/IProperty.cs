using System;
using System.Collections.Generic;

namespace RentApp.Models.Interfaces
{
    public interface IProperty
    {
        double? Area { get; set; }
        double Lat { get; set; }
        double Lng { get; set; }
        string LocationName { get; set; }
        List<Guid?> ImageIdList { get; set; }
    }
}
