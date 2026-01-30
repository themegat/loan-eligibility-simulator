using LoanEligibilitySimulatorApi.Dto.Request;
using LoanEligibilitySimulatorApi.Dto.Response;
using LoanEligibilitySimulatorApi.Service;
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

        [HttpPost("eligibility")]
        public async Task<ActionResult<EligibilityResponse>> GetLoanEligibility(
            [FromBody] EligibilityRequest request
        )
        {
            var eligibility = await _loanService.GetLoanEligibility(request);
            return Ok(eligibility);
        }

        [HttpGet("products")]
        public async Task<ActionResult<ProductsResponse>> GetAvailableProducts()
        {
            var products = await _loanService.GetAvailableProducts();
            return Ok(products);
        }

        [HttpPost("calculate-rate")]
        public async Task<ActionResult<CalculateRateResponse>> CalculateInterestRate(
            [FromBody] CalculateRateRequest request
        )
        {
            var rate = await _loanService.CalculateInterestRate(request);
            return Ok(rate);
        }

        [HttpGet("validation-rules")]
        public async Task<ActionResult<ValidationRulesResponse>> GetValidationRules()
        {
            var rules = await _loanService.GetValidationRules();
            return Ok(rules);
        }
    }
}
