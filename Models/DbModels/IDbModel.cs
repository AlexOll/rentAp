using System;

namespace RentApp.Models.DbModels
{
    public interface IDbModel
    {
        Guid Id { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
        bool IsAlive { get; set; }
    }
}