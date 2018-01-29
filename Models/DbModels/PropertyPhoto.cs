using System;

namespace RentApp.Models.DbModels
{
    public class PropertyPhoto
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public int PhotoOrder { get; set; }
    }
}
