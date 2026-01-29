namespace LoanEligibilitySimulatorApi.Dto;

public class AffordabilityAnalysis
{
    public double DisposableIncome { get; set; }
    public double DebtToIncomeRatio { get; set; }
    public double LoanToIncomeRatio { get; set; }
    public string? AffordabilityScore { get; set; }
}

public class RecommendedLoan
{
    public double MaxAmount { get; set; }
    public double RecommendedAmount { get; set; }
    public double InterestRate { get; set; }
    public double MonthlyPayment { get; set; }
    public double TotalRepayment { get; set; }
}

public class EligibilityResult
{
    public bool IsEligible { get; set; }
    public int ApprovalLikelihood { get; set; }
    public string? RiskCategory { get; set; }
    public string? DecisionReason { get; set; }
}

public class EligibilityResponse
{
    public EligibilityResult? EligibilityResult { get; set; }
    public RecommendedLoan? RecommendedLoan { get; set; }
    public AffordabilityAnalysis? AffordabilityAnalysis { get; set; }
}
