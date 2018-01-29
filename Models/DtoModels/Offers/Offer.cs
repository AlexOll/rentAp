using System;
using System.Collections.Generic;
using RentApp.Models.Interfaces;
using RentApp.Utilities;

namespace RentApp.Models.DtoModels.Offers
{
    public abstract class Offer : IOffer
    {
        public Offer(int price)
        {
            Price = price;
        }

        public int Price { get ; set ; }
    }
}
