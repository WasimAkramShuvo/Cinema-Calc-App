namespace CinemaCalcAPI.DTO
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Markup { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
