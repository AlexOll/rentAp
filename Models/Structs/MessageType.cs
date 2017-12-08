
using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum MessageType
    {
        [Description("InBox messages")]
        InBox = 1,
        [Description("Sent messages")]
        Sent,
        [Description("Archive messages")]
        Archive
    }
}
