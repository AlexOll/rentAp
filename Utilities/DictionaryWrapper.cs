using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace RentApp.Utilities
{
    public static class EnumExtensionHelper
    {
        public static Dictionary<int, string> GetDictionaryFromEnum<T>() where T : struct
        {
            var result = new Dictionary<int, string>();
            foreach (var foo in Enum.GetValues(typeof(T)))
            {
                T obj = (T)foo;
                result.Add((int)foo, obj.GetDescription());
            }
            return result;
        }

        public static string GetDescription<Tr>(this Tr enumerationValue) where Tr : struct
        {
            var type = enumerationValue.GetType();
            if (!type.IsEnum)
            {
                throw new ArgumentException($"{nameof(enumerationValue)} must be of Enum type", nameof(enumerationValue));
            }
            var memberInfo = type.GetMember(enumerationValue.ToString());
            if (memberInfo.Length > 0)
            {
                var attrs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }
            else{
                throw new ArgumentException($"{nameof(enumerationValue)} no attributes found", nameof(enumerationValue));
            }
            return enumerationValue.ToString();
        }

    }
}
