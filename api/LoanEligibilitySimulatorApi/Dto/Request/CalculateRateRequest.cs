using System;

namespace LoanEligibilitySimulatorApi.Dto.Request;

public class CalculateRateRequest
{
    public double LoanAmount { get; set; }
    public int LoanTerm { get; set; }
    public int CreditScore { get; set; }
    public required string LoanType { get; set; }
}
