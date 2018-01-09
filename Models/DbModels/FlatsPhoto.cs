using System;namespace RentApp.Models.DbModels
{
    public class FlatsPhoto
    {
        public Guid Id { get; set; }
        public Guid FlatId { get; set; }
        public Guid PhotoId { get; set; }
    }
}
