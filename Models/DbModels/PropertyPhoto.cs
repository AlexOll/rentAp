using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentApp.Models.DbModels
{
    [Table("PropertyPhotos")]
    public class PropertyPhoto
    {
        public Guid Id { get; set; }
        public Guid OfferId { get; set; }
        public int OrderNumber { get; set; }
    }
}
