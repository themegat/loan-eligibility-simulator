using System;

namespace LoanEligibilitySimulatorApi.Dto.Request;

public class PersonalInfo
{
    public int Age { get; set; }
    public required string EmploymentStatus { get; set; }
    public int EmploymentDuration { get; set; }
}

public class FinancialInfo
{
    public double MonthlyIncome { get; set; }
    public double MonthlyExpenses { get; set; }
    public double ExistingDebt { get; set; }
    public int CreditScore { get; set; }
}

public class LoanDetails
{
    public double RequestedAmount { get; set; }
    public int LoanTerm { get; set; }
    public required string LoanPurpose { get; set; }
}

public class EligibilityRequest
{
    public required PersonalInfo PersonalInfo { get; set; }
    public required FinancialInfo FinancialInfo { get; set; }
    public required LoanDetails LoanDetails { get; set; }
}
