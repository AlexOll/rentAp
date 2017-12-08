using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApp.Utilities
{
    public class EnumExtensionHelper
    {
        public static Dictionary<int,string> GetDictionary<T>() where T : struct
        {
            var result = new Dictionary<int, string>();
            foreach (var foo in Enum.GetValues(typeof(T)))
            {
                result.Add((int)foo, foo.ToString());
            }
            return result;
        }
    
    }
}
