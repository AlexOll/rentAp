using System;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.DbModels
{
    public class BaseRealEstateDetailes
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
