using CinemaCalcAPI.DTO;
using CinemaCalcAPI.Interfaces;
using CinemaCalcAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaCalcAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseController(
            IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [HttpGet("getAllExpenses")]
        public List<ExpenseDto> GetAllExpenses()
        {
            var result = _expenseRepository.GetAll().OrderByDescending(x=> x.CreatedOn).ToList();
            var expenseDtos = result.Select(expense => new ExpenseDto
            {
                Id = expense.Id,
                Name = expense.Name,
                Price = expense.Price,
                Markup = expense.Markup,
                TotalPrice = expense.TotalPrice
            }).ToList();

            return expenseDtos;
        }

        [HttpGet("getExpenseById/{id}")]
        public ExpenseDto GetExpenseById(int id)
        {
            var _expense = _expenseRepository.GetSingle(id);
            var expenseDto = new ExpenseDto();
            if (_expense != null) 
            { 
                expenseDto.Id = id;
                expenseDto.Name = _expense.Name;
                expenseDto.Price = _expense.Price;
                expenseDto.Markup = _expense.Markup;
                expenseDto.TotalPrice = _expense.TotalPrice;
            }

            return expenseDto;
        }

        [HttpPost("createExpense")]
        public IActionResult CreateExpense([FromBody] CreateExpenseDto expense)
        {
            if (expense == null)
                return BadRequest();

            var _expense = new Expense();
            _expense.Name = expense.Name;
            _expense.Price = expense.Price;
            _expense.Markup = expense.Markup;
            _expense.TotalPrice = expense.Price + (expense.Price * expense.Markup / 100);

            _expenseRepository.Add(_expense);
            _expenseRepository.Commit();

            return Ok(new
            {
                Status = 200,
                Message = "Expense Added!"
            });
        }

        [HttpPut("updateExpense/{id}")]
        public IActionResult UpdateExpense(int id, [FromBody] CreateExpenseDto expense)
        {
            if (expense == null)
                return BadRequest();
            var _expense = _expenseRepository.GetSingle(id);

            if (_expense != null)
            {
                _expense.Name = expense.Name;
                _expense.Price = expense.Price;
                _expense.Markup = expense.Markup;
                _expense.TotalPrice = expense.Price + (expense.Price * expense.Markup / 100);
            }
            _expenseRepository.Update(_expense);
            _expenseRepository.Commit();

            return Ok(new
            {
                Status = 200,
                Message = "Expense updated!"
            });
        }

        [HttpDelete("deleteExpense/{id}")]
        public IActionResult DeleteExpense(int id)
        {
            var expense = _expenseRepository.GetSingle(x=> x.Id == id);
            if (expense == null)
            {
                return NotFound();
            }

            _expenseRepository.Delete(expense);
            _expenseRepository.Commit();

            return Ok(new
            {
                Status = 200,
                Message = "Expense deleted!"
            });
        }
    }
}
