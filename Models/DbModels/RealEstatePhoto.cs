using System;namespace RentApp.Models.DbModels
{
    public class RealEstatePhoto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public Guid RealEstateId { get; set; }
        public Guid PhotoHash { get; set; }
    }
}
