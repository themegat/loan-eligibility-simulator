using LoanEligibilitySimulatorApi.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoanEligibilitySimulatorApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly LoanService _loanService;

        public LoansController(LoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet("eligibility")]
        public async Task<IActionResult> GetLoanEligibility()
        {
            var eligibility = await _loanService.GetLoanEligibility();
            return Ok(eligibility);
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetAvailableProducts()
        {
            var products = await _loanService.GetAvailableProducts();
            return Ok(products);
        }

        [HttpGet("calculate-rate")]
        public async Task<IActionResult> CalculateInterestRate()
        {
            var rate = await _loanService.CalculateInterestRate();
            return Ok(rate);
        }

        [HttpGet("validation-rules")]
        public async Task<IActionResult> GetValidationRules()
        {
            var rules = await _loanService.GetValidationRules();
            return Ok(rules);
        }
    }
}
