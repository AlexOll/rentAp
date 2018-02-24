using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Models.DbModels
{
    public abstract class BaseRealEstateDetailes
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
