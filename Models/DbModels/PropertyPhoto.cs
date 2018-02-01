using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentApp.Models.DbModels
{
    [Table("PropertyPhotos")]
    public class PropertyPhoto
    {
        public Guid Id { get; set; }
        public Guid OfferId { get; set; }

        [Column(TypeName = "ntext")]
        [MaxLength]
        public string Base64 { get; set; }

        public string Url { get; set; }
        public int OrderNumber { get; set; }
    }
}
