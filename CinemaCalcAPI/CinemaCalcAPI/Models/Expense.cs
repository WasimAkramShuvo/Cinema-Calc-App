namespace CinemaCalcAPI.Models
{
    public class Expense: EntityBase
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Markup { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
