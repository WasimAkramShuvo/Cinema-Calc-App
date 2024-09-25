namespace CinemaCalcAPI.DTO
{
    public class CreateExpenseDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Markup { get; set; }
    }
}
