using System;

namespace RentApp.Models.DbModels
{
    public interface IDbModel
    {
        Guid Id { get; set; }
        DateTime CreateDateTime { get; set; }
        DateTime UpdateDate { get; set; }
        bool IsAlive { get; set; }
    }
}