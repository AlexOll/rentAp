using System.ComponentModel;

namespace RentApp.Models.Structs
{
    public enum ConstructionMaterialType
    {
        [Description("Brick")]
        Brick = 1,
        [Description("Monolith")]
        Monolith,
        [Description("Metal")]
        Metal
    }
}
