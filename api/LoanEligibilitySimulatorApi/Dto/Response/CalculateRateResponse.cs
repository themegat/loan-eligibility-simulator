using System;

namespace LoanEligibilitySimulatorApi.Dto.Response;

public class PaymentSchedule
{
    public int Month { get; set; }
    public double Payment { get; set; }
    public double Principal { get; set; }
    public double Interest { get; set; }
    public double Balance { get; set; }
}

public class CalculateRateResponse
{
    public double InterestRate { get; set; }
    public double MonthlyPayment { get; set; }
    public double TotalInterest { get; set; }
    public double TotalRepayment { get; set; }
    public required List<PaymentSchedule> PaymentSchedules { get; set; }
}
